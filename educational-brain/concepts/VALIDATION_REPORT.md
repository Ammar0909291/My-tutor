# Educational Brain Production Pipeline — Validation Report

Generated 2026-07-22 against the live repository state; re-run this batch
(Physics Wave 11) against the post-push state (`origin/main` @
`8540dab1`). Every check below was computed directly from
`docs/{subject}/kg/graph.json` (all 6 subjects), `docs/curriculum/blueprints/`,
and `educational-brain/concepts/{subject}/` — none of the numbers here are
estimated or copied from prior reports.

## Structural KG integrity (all 6 subjects, re-run this batch)

`npx tsx scripts/validate-knowledge-graph.ts docs/{subject}/kg/graph.json`
for mathematics, physics, chemistry, biology, computer_science, and
english — re-run fresh this batch, all 6 still PASS with unchanged
concept counts (this batch authored Educational Brain entries only; no
KG file was touched):

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
(190 files, re-checked this batch after 11 new `phys.*` Wave 11 entries)
against that subject's live KG id set. **0 orphans** — every EB file
resolves to a real, current KG concept.

**✓ Every KG concept has at most one Educational Brain entry.**
Structurally guaranteed by the 1:1 `{kg-id}.md` filename convention;
verified with no exceptions (including a case-insensitive check, since a
filesystem could technically hold `Foo.md` and `foo.md` as distinct
files) — **0 duplicates**.

**◐ Every Educational Brain entry references one Blueprint — partially,
honestly reported.** 183 of 190 EB entries' concepts have a matching
Blueprint FILE on disk. The other 7 (`math.found.definition`,
`inductive-reasoning`, `mathematical-modeling`, `mathematical-symbols`,
`problem-solving-strategies` — Wave 2 — plus `reading-mathematics` —
Wave 3 — plus `empty-set` — Wave 5) genuinely have no Blueprint yet —
each states this explicitly in its own Blueprint References section per
Quality Gate 2, rather than omitting the section. All 11 of this batch's
new physics entries (Wave 11) DO have existing Blueprints, each reused by
reference. 120 of the 190 now have an explicit, machine-checkable
"Blueprint References" section citing it by name (or citing its absence)
— `eng.phonics.print-concepts` plus this program's 31 `math.found.*`
entries plus 12 `phys.*` Wave 6 entries plus 25 `phys.*` Wave 7 entries
plus 15 `phys.*` Wave 8 entries plus 16 `phys.*` Wave 9 entries plus 9
`phys.*` Wave 10 entries plus this batch's 11 `phys.*` Wave 11 entries,
all authored under `EDUCATIONAL_BRAIN_STANDARD.md`. The remaining 70
predate that section (authored under the old `TEMPLATE.md`) and
reference their Blueprints only informally or not at all in prose — the
migration debt already recorded in `EDUCATIONAL_BRAIN_STANDARD.md` §6
and `QUALITY.md`.

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
Blueprint/EB/Status columns) and `AUTHORING_QUEUE.md` (1,585 rows — every
`MISSING` concept, with `math.found`'s remaining 51 called out as the
default next targets per the current Domain Certification Mode, unless
overridden by an equally explicit subject-specific instruction as this
batch was) for the complete, per-concept detail behind every count in
this report.

## Verdict

**No blocking defect found.** The two mathematics/chemistry cross-link
findings (KG-level, pre-existing) remain informational, as does this
batch's own new physics cross-link finding (11 empty-but-genuine
cross-subject connections + 1 honest "none found" — an EB-authoring-level
observation, not a KG defect). None of these break any of the Phase 2
checklist's pass/fail criteria. The two open items (Blueprint References
migration debt on 70 pre-Standard entries; math.found domain at 31/82)
are already tracked, already have owners (future reconciliation/
continuation batches), and do not block new authoring under the current
Standard.

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

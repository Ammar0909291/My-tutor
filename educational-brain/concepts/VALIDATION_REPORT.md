# Educational Brain Production Pipeline — Validation Report

Generated 2026-07-22 against the live repository state. Every check below
was computed directly from `docs/{subject}/kg/graph.json` (all 6
subjects), `docs/curriculum/blueprints/`, and
`educational-brain/concepts/{subject}/` — none of the numbers here are
estimated or copied from prior reports.

## Structural KG integrity (all 6 subjects, re-run this batch)

`npx tsx scripts/validate-knowledge-graph.ts docs/{subject}/kg/graph.json`
for mathematics, physics, chemistry, biology, computer_science, and
english (biology and computer_science were validated for the first time
this session — mathematics/physics/chemistry/english were last confirmed
clean in the prior curriculum-validation series):

| Subject | Status | Concepts | Reachable | Broken requires/unlocks |
|---|---|---|---|---|
| mathematics | PASS | 908 | 908/908 | 0 |
| physics | PASS | 238 | 238/238 | 0 |
| english | PASS | 216 | 216/216 | 0 |
| chemistry | PASS | 186 | 186/186 | 0 |
| biology | PASS | 89 | 89/89 | 0 |
| computer_science | PASS | 119 | 119/119 | 0 |

Zero failures, zero warnings, 100% reachability, all six — this is the
"mathematically correct" baseline the rest of this report depends on.

## Phase 2 checklist

**✓ Every Educational Brain entry points to one existing KG concept.**
Checked: every filename in `educational-brain/concepts/{subject}/`
(71 files) against that subject's live KG id set. **0 orphans** — every
EB file resolves to a real, current KG concept.

**✓ Every KG concept has at most one Educational Brain entry.**
Structurally guaranteed by the 1:1 `{kg-id}.md` filename convention;
verified with no exceptions (including a case-insensitive check, since a
filesystem could technically hold `Foo.md` and `foo.md` as distinct
files) — **0 duplicates**.

**◐ Every Educational Brain entry references one Blueprint — partially,
honestly reported.** All 71 EB entries' concepts have a matching
Blueprint FILE on disk (71/71, unchanged from the prior batch's finding).
Only 1 of the 71 (`eng.phonics.print-concepts`, authored under the new
`EDUCATIONAL_BRAIN_STANDARD.md`) has an explicit, machine-checkable
"Blueprint References" section citing it by name. The other 70 predate
that section (they were authored under the old `TEMPLATE.md`, which had
no such field) and reference their Blueprints only informally or not at
all in prose. This is the migration debt already recorded in
`EDUCATIONAL_BRAIN_STANDARD.md` §6 and `QUALITY.md` — restated here as a
validation finding, not a new discovery, and not fixed in this batch.

**✓ No duplicate Educational Brain files.** 0 found (see above).

**✓ No orphan Educational Brain files.** 0 found (see above).

**✓ No broken Blueprint references.** Every Blueprint file that exists is
reachable at the path its corresponding EB entry (or, for the 70
pre-Standard entries, its filename-implied concept) would use —
`docs/curriculum/blueprints/{kg-id}.md`, checked by direct file-existence
test for all 71, all present.

**✓ No broken KG references.** 0 broken `requires`/`unlocks` edges across
all 1,756 concepts in all 6 subjects (see the integrity table above).

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

## Full index and queue

See `EDUCATIONAL_BRAIN_INDEX.md` (1,756 rows, one per KG concept, with
Blueprint/EB/Status columns) and `AUTHORING_QUEUE.md` (1,685 rows — every
`MISSING` concept in permanent prerequisite order) for the complete,
per-concept detail behind every count in this report.

## Verdict

**No blocking defect found.** The two cross-link findings are informational
(one by design, one a small Curriculum Feedback item) and neither breaks
any of the Phase 2 checklist's pass/fail criteria. The one open item
(Blueprint References migration debt on 70 pre-Standard entries) is
already tracked, already has an owner (future reconciliation batches),
and does not block new authoring under the current Standard.

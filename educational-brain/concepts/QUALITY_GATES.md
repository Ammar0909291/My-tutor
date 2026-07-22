# Quality Gates — Mandatory Before Accepting Any Educational Brain Entry

Every gate below must pass before a new or revised
`educational-brain/concepts/{subject}/{kg-id}.md` file is committed. This
is a checklist specification, not automation — no gate here is
implemented as a script in this batch (per this task's explicit "document
the algorithm only" instruction); each gate states what must be true and
how a human or a future script would check it.

## Gate 1 — KG exists

**Criterion**: `{kg-id}` is a real, current concept id in
`docs/{subject}/kg/graph.json`.
**Check**: the id appears in that file's `concepts[].id` array, and the
subject's KG validator (`scripts/validate-knowledge-graph.ts`) currently
reports PASS for the whole file (an entry anchored to a KG that is itself
broken is not trustworthy).
**Failure mode this catches**: authoring against a stale or renamed KG id
— becomes an ORPHAN in `EDUCATIONAL_BRAIN_INDEX.md` the moment the KG
changes underneath it.

## Gate 2 — Blueprint exists

**Criterion**: `docs/curriculum/blueprints/{kg-id}.md` exists.
**Check**: direct file-existence test.
**If it does NOT exist**: the entry may still be authored (a missing
Blueprint is the Curriculum Production Pipeline's backlog, not a block on
Educational Brain authoring), but the entry's "Blueprint References"
section (see Gate 3) must say so explicitly rather than silently omit the
section — this is itself useful signal, tracked, not hidden.

## Gate 3 — Standard template followed

**Criterion**: the entry contains all 21 sections of
`EDUCATIONAL_BRAIN_STANDARD.md` §3, in the exact heading text specified
there, in order. **Sections marked (required) in the Standard must all be
present**; no numbered-heading variant (retired per the Standard's §1.2
finding).
**Check**: grep the file for `^## ` and diff the resulting list against
the Standard's 21-section list.
**Failure mode this catches**: exactly the heading-style drift found in
this program's Phase 2 review (numbered vs. unnumbered headings across
different batches) — this gate is the direct fix that prevents it from
recurring.

## Gate 4 — Blueprint not duplicated

**Criterion**: none of the entry's Misconceptions, Demonstrations, or
Teaching Sequence content re-states worked examples, mastery-probe item
banks, or session-architecture scripts already present in the concept's
Blueprint (if one exists per Gate 2).
**Check**: if a Blueprint exists, read it before authoring; the entry's
"Blueprint References" section must name which Blueprint Components are
reused BY REFERENCE (not copied) — per
`EDUCATIONAL_BRAIN_STANDARD.md` §4's ownership table. A reviewer checks
this by reading both files side by side and confirming the EB entry cites
rather than restates.
**Failure mode this catches**: the exact duplication risk
`EDUCATIONAL_BRAIN_STANDARD.md` §1.2 found across all 71 pre-Standard
entries (each has its own Blueprint, and Assessment sections were not
scoped against that overlap) — this gate is the direct fix.

## Gate 5 — Runtime assets not duplicated

**Criterion**: the entry does not itself create, seed, or hand-author any
`AssetIdentity`/`ExplanationAsset`/`ProbeAsset` content, nor any lesson
dialogue, hint text, or visualization spec that belongs to a
runtime-generated layer per `EDUCATIONAL_BRAIN_STANDARD.md` §4's
ownership table.
**Check**: the entry's "Runtime Asset References" section states either
the concept's existing seeded assets' `canonicalSlug` pattern (if any
exist in `src/lib/teaching/assets/brainSeedAssets.ts` or the live DB) or
explicitly "none exist" — and no other section of the entry contains
content that reads as a servable asset (a full lesson script, a
ready-to-render explanation card) rather than teaching REASONING.
**Failure mode this catches**: an author quietly re-implementing Layer 5/
6/7/8/9 content (explicitly out of this program's scope per
`CLAUDE.md`'s layer-ownership mapping) inside what should be a pure HOW-
to-teach reasoning document.

## Gate 6 — Cross-links valid

**Criterion**: every id the entry cites (in Prerequisites, Unlocks,
Cross-Subject Connections, or anywhere else) is either a real KG id in
some subject's `graph.json`, or an explicitly-labeled recognized
aspirational placeholder (`math.phys.*`, `math.cs.*`, `math.eng.*` per
the KG validator's own `ASPIRATIONAL_PREFIXES`).
**Check**: cross-reference every cited id against the union of all 6
subjects' KG id sets; flag anything unresolved as Curriculum Feedback
(never silently fixed, never silently dropped).
**Failure mode this catches**: exactly the one genuine broken cross-link
this batch's `VALIDATION_REPORT.md` found
(`chem.atomic.electromagnetic-radiation` →
`phys.opt.wave-nature-of-light`, a real but nonexistent id) — this gate
would catch a comparable error inside a new EB entry before it ships.

## Gate 7 — Curriculum feedback included

**Criterion**: the entry's "Curriculum Feedback" section is present and
either states a genuine finding (a KG issue teaching revealed) or
explicitly states "none found" with one sentence of justification — never
silently absent.
**Check**: section presence + non-empty content, per Gate 3's heading
check plus a manual read for genuine vs. boilerplate content.

## Gate 8 — Version recorded

**Criterion**: the entry's "Version History" section has at least one
dated line naming what was authored and why.
**Check**: section presence, per Gate 3, plus a non-empty first line with
a real date.
**Note**: this gate is new with `EDUCATIONAL_BRAIN_STANDARD.md` — the 71
pre-Standard entries all currently fail it (0/71, per `QUALITY.md`), which
is expected migration debt, not something Gate 8 should be applied to
retroactively; it applies to every entry authored or revised from this
Standard forward.

## How these gates are used

A concept entry is `READY` (per `EDUCATIONAL_BRAIN_INDEX.md`'s status
column) only once all 8 gates pass. This is the acceptance criterion
referenced by `PRODUCTION_PIPELINE.md`'s frozen workflow — no batch may
mark a concept complete, update `ROADMAP.md`/`QUALITY.md`/`COVERAGE.md`,
or commit without having walked all 8 gates for every concept in that
batch.

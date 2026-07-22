# Educational Brain Production Pipeline — Algorithm and Frozen Workflow

Documentation only — no runtime automation is implemented by this batch,
per explicit instruction. This is the permanent specification a human (or
a future automated batch) follows exactly.

## Phase 4 — Batch generator algorithm

**Input**: the current repository state (the 6 KG files, the Blueprint
directory, the `educational-brain/concepts/` tree).
**Output**: the next authoring batch — a small, ordered list of concept
ids.

```
function next_batch(max_batch_size):
    1. Regenerate the dependency graph and level assignment for every
       subject (exactly as AUTHORING_QUEUE.md's build script does):
       for each subject, run Kahn's algorithm over the `requires` DAG
       to get every concept's topological level.

    2. Find unfinished root concepts:
       for each subject, in fixed order [mathematics, physics, english,
       chemistry, biology, computer_science]:
         if that subject has a level-0 (root) concept with no
         Educational Brain entry yet → it is eligible NOW.

    3. If no unfinished root concepts remain in ANY subject:
       unlock the next dependency layer — i.e. advance to level 1, then
       level 2, etc., subject by subject in the same fixed order,
       re-checking eligibility at each level. A concept at level N is
       only eligible once every concept it requires (necessarily at a
       lower level) already has a READY Educational Brain entry — this
       is automatically guaranteed by construction, since level
       assignment itself required all prerequisites to be leveled first.

    4. Never skip prerequisites:
       eligibility per step 2/3 IS the prerequisite check — there is no
       separate skip-ahead path. A concept is never eligible while any
       prerequisite is still MISSING.

    5. Never duplicate work:
       any concept already READY (has an EB entry, per
       EDUCATIONAL_BRAIN_INDEX.md's Status column) is filtered out before
       being offered as a candidate — this is the same filter
       AUTHORING_QUEUE.md's generation script already applies.

    6. Take the first `max_batch_size` eligible concepts, in the order
       produced by steps 2-3 (this is exactly AUTHORING_QUEUE.md's row
       order, read from the top) — this is the returned batch. Batch
       size is configurable per session; the program's own standing rule
       (CLAUDE.md) is "one small bounded batch per turn," typically 1.
```

This is precisely how `AUTHORING_QUEUE.md` was generated this batch — the
algorithm above is not a new design, it is the documented, reusable form
of the same script (`build_index.py` / `build_queue.py`, this batch's
scratch tooling) so any future session can re-derive the queue without
re-deriving the reasoning.

**After every completed batch, three files must be regenerated from
source** (never hand-incremented):
- `ROADMAP.md` — totals, completion %, current/next batch, priority
  queue summary.
- `COVERAGE.md` — per-subject entry list + delivery-history line for the
  batch.
- `QUALITY.md` — per-entry completeness ledger, extended with the new
  concept(s).

`EDUCATIONAL_BRAIN_INDEX.md` and `AUTHORING_QUEUE.md` are also
regenerated (their row counts and Status columns change every time a
concept moves from MISSING to READY) — grouped with the three above as
"files updated every batch," even though Phase 6's diagram below lists
ROADMAP/QUALITY/COVERAGE by name (matching the instruction's literal
list); in practice all five tracking files move together.

## Phase 6 — Frozen production workflow

**Declared FROZEN as of this batch**, contingent on the validation in
`VALIDATION_REPORT.md` (no blocking defect found). Every future
Educational Brain authoring batch, without exception, follows this
sequence:

```
Select next concept(s)         (Phase 4 algorithm, above — no manual override)
        ↓
Author Educational Brain       (per EDUCATIONAL_BRAIN_STANDARD.md, all 21 sections)
        ↓
Validate                       (all 8 gates in QUALITY_GATES.md must pass)
        ↓
Update INDEX                   (EDUCATIONAL_BRAIN_INDEX.md — status MISSING → READY)
        ↓
Update ROADMAP                 (ROADMAP.md — totals, %, next batch)
        ↓
Update QUALITY                 (QUALITY.md — new row(s))
        ↓
Update COVERAGE                (COVERAGE.md — entry list + delivery-history line)
        ↓
Commit
        ↓
Push
```

**No future batch may bypass this workflow.** Specifically:
- Selection is never manual (Phase 4's algorithm is the only legitimate
  source of "what's next" — a session that wants to deviate must argue
  why the graph-derived order is wrong, as a Curriculum Feedback item,
  not silently pick a different concept).
- A concept is never marked READY without all 8 Quality Gates passing.
- The four tracking files (`ROADMAP.md`, `QUALITY.md`, `COVERAGE.md`,
  `EDUCATIONAL_BRAIN_INDEX.md`) are never allowed to drift out of sync
  with the actual `educational-brain/concepts/` directory contents —
  updating them is part of the batch, not a follow-up.
- `AUTHORING_QUEUE.md` is regenerated whenever the KG or the EB directory
  changes enough to shift the queue (at minimum, every batch).

## Freeze scope

This freezes the WORKFLOW (the sequence and its gates), not the CONTENT
of any file it touches — `EDUCATIONAL_BRAIN_STANDARD.md` itself can still
evolve (e.g. the acknowledged migration-debt reconciliation of the 71
pre-Standard entries is legitimate future work), and the KG/Blueprint
layers remain entirely outside this program's authority, unchanged by
this freeze, per the standing rule that the Curriculum Production
Pipeline is their sole owner.

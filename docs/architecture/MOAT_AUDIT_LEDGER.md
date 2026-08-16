# Moat Audit Ledger

Durable record of the Moat assessment/teaching-quality campaign. Physics and
Chemistry only. Every entry states what was MEASURED and how, and distinguishes
**authored-in-repo** / **seeded-in-production** / **production-served** /
**production-verified**. Estimates are never recorded as measurements.

---

## Stage status (as of 2026-08-16)

| Stage | Scope | Physics | Chemistry | State |
|---|---|---|---|---|
| S1 | gradeable probe count (authored) | 238/238 | 186/186 | CLOSED |
| S2 | blueprint MC coverage (authored) | 604/604 | 537/537 | CLOSED |
| S3 | structural tag integrity (orphan MC ids) | 30 residual | 4 residual | CLOSED — all classified |
| S4 | stem-vs-blueprint agreement | 238/238 | 186/186 | CLOSED |
| S5 | visual semantic (offline) | 23 widened, inspected | 20 widened, inspected | CLOSED |
| S6 | visual semantic (live) | — | — | NOT MEASURED |
| S7 | real-tutor behaviour | prose-MCQ guard deployed | — | DEPLOYED, not production-verified |
| S8 | production seeding | **196/238 served** | 186/186 served | **DEFECT OPEN** |
| S9 | end-user runtime | — | — | NOT MEASURED |
| S10 | regression protection | offline pinned + prod audit script | same | ONGOING |

---

## S3 — structural tag integrity (CLOSED 2026-08-16)

All 33 physics and 4 chemistry orphan misconception ids were classified by
reading the relevant blueprint body against the probe stem.

**3 RENAME (fixed, commit `64a70d1`)** — same misconception, different spelling:

| Concept | Was | Now |
|---|---|---|
| `phys.therm.specific-heat` | `MC-HEAT-IS-STORED` | `MC-HIGH-TEMPERATURE-MEANS-HIGH-HEAT-CONTENT` |
| `phys.therm.phase-transitions` | `MC-PHASE-HEAT-RAISES-TEMP` | `MC-TEMPERATURE-RISES-DURING-PHASE-CHANGE` |
| `phys.therm.ideal-gas-law` | `MC-FORGET-KELVIN-CONVERSION` | `MC-CELSIUS-IN-GAS-LAW` |

Physics ratchet 33 → 30; the three ids are pinned individually so a revert
fails with the id, not just a count.

**30 physics + 4 chemistry NO-MATCH** — the probe diagnoses a real
misconception the blueprint does not document. These are **curriculum
feedback**, not defects this campaign may fix: rewriting the tag would make the
join succeed while the probe still tests something the blueprint never
registered. Two candidates were explicitly REJECTED as renames after reading
both texts:

- `phys.mech.bernoulli:MC-FASTER-MEANS-HIGHER-PRESSURE` — the probe tests
  "faster fluid ⇒ higher pressure"; the blueprint's
  `MC-BERNOULLI-FAST-LOW-PRESSURE-MYSTERY` is about accepting fast⇒lower as an
  unexplained suction rule. Opposite beliefs.
- `phys.mech.surface-tension:MC-LARGER-HAS-HIGHER-PRESSURE` — the probe tests
  Laplace-pressure inversion; the blueprint's `MC-SURFACE-TENSION-IS-PRESSURE`
  is about confusing N/m with N/m². Different concepts.

---

## S8 — production seeding: OPEN DEFECT (found 2026-08-16)

### The finding

**42 of 238 physics concepts (17.6%) have no ACTIVE gradeable probe in
production.** Chemistry is complete at 186/186.

Measured directly against production (`asset_identity`, Supabase
`ywakxiqbevfuxsiwewnw`), read-only:

```
subject   total_concepts   with_active_gradeable   missing
chem      186              186                     0
phys      238              196                     42
```

Gradeable families counted: `mcq`, `true_false`, `checkpoint`, `short_answer`,
`step_check`, `misconception_probe`.

### Why it matters — this is learner-facing, not cosmetic

`findBestProbe` (`src/lib/teaching/assets/teachingActionRepository.ts:40`)
queries `assetIdentity` with `status: ACTIVE`. The runtime reads the DATABASE,
not the in-repo corpus. For these 42 concepts it returns null, so
`probeToMcq` never runs and the server-owned gate assessment never fires. The
mastery-gate question reverts to the model generating one in prose — the exact
ungradeable path `gateAssessment.ts` was built to remove.

It compounds with S7: the prose-MCQ guard now *suppresses* LLM-claimed
correctness on that shape. Correct behaviour (better a missing record than a
false one), but it means for these 42 concepts a learner can answer correctly
at a gate and have **nothing recorded**, so the gate may never close.

### Root cause

A single bulk deprecation at `2026-08-12 21:59:37.418` retired **734 legacy
4-segment-slug** gradeable rows across **all 238** physics concepts, migrating
to the difficulty-bearing 5-segment identity. The re-seed under the new
identity covered only 196 concepts:

```
status      slug_segments   rows   concepts   window
ACTIVE      5 (new)         304    195        2026-08-11 .. 2026-08-16
ACTIVE      4 (legacy)       25     24        2026-08-11 .. 2026-08-16
DEPRECATED  4 (legacy)      734    238        2026-08-12 21:59:37 (single event)
```

The 42 were deprecated and never re-seeded.

### It is NOT an authoring gap

Verified against the repo: **all 42 have authored gradeable probes** in
`AUTHORED_PROBES`. `gateAssessmentIsServerOwned.test.ts:152` already asserts
every physics concept with an authored probe has at least one gradeable one
(238/238) and passes. The offline invariant is sound; only the production
seeding run is incomplete.

### Affected concepts (42)

- `phys.particle.*` — 16 (the entire Particle Physics domain)
- `phys.stat.*` — 14
- `phys.mod.*` semiconductors — 6
- `phys.qm.*` — 4 (`density-matrix`, `quantum-tunneling`, `s-matrix-basics`, `selection-rules`)
- `phys.mech.displacement`, `phys.mech.hookes-law` — 2

### Repair — REQUIRES OWNER AUTHORIZATION

The fix is a **production write** and is therefore blocked under the standing
"no production writes" rule. The repair is a re-seed of those 42 concepts'
gradeable probes under the difficulty-bearing identity
(`scripts/brain/seed-knowledge-assets.ts`, idempotent — it skips slugs that
already exist). No content needs to be authored; no code needs to change.

**Status: awaiting authorization. Not attempted.**

### Confirmed by two independent methods

The 42 is not an artifact of how "gradeable" was defined. Both give the same
numbers (physics 196 served / 238 authored; chemistry 186/186):

1. **Family-name filter** — ACTIVE rows whose `familyKind` is one of
   `mcq`/`true_false`/`checkpoint`/`short_answer`/`step_check`/`misconception_probe`.
2. **Conversion predicate** — ACTIVE rows whose `choices` actually satisfy
   `probeToMcq`'s rules (2–4 options, exactly one `isCorrect`). This is the
   stricter and more truthful test, because it is what the turn itself runs.

---

## S10 — regression protection

`scripts/moat/audit-production-seeding.ts` (read-only) compares authored-vs-
served per subject, importing `probeToMcq` so it measures what the tutor could
really serve. Exits 1 on a gap, so it can gate a post-deploy check. This closes
the blind spot that let S8 happen: the suite proves what is AUTHORED, the
runtime serves what is ACTIVE, and until now nothing compared them.

Two defects were found and fixed while writing it, both of which would have
made the audit report a false pass — recorded because they are the failure mode
this class of script is most prone to:

- A `as unknown as Row[]` cast masked a wrong relation name (`probe` vs the
  schema's `probeAsset`). The cast is gone; tsc now checks the query.
- The corpus omitted the chemistry/biology/CS arrays, so chemistry reported
  "0 authored, 0 missing" — a clean pass produced by looking at nothing. It is
  now composed exactly as `seed-knowledge-assets.ts:43` composes it.

---

## Verification honesty notes

- **Prose-MCQ guard (S7)**: commit `de1d29d` is an ancestor of `64a70d1`, which
  is READY in production — so it is **DEPLOYED**. Wiring verified in code at
  both the prompt-directive and evidence-suppression points, and the
  `orderBy: createdAt desc` ordering confirmed so `.find()` returns the most
  recent assistant message. It is **NOT production-verified**: production
  runtime logs show zero traffic in the retention window, so the
  `[prose-mcq-ungradeable]` marker has no session to fire on.
- **S6 / S9** remain NOT MEASURED. Both need live learner traffic, and there
  has been none in the observable window.

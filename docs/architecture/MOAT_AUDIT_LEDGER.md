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
| S8 | production seeding | **238/238 served** | 186/186 served | **CLOSED (repaired)** |
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

## S8 — production seeding: FOUND AND REPAIRED (2026-08-16)

### The finding

**42 of 238 physics concepts (17.6%) had no ACTIVE gradeable probe in
production.** Chemistry was already complete at 186/186. Now repaired — see
"Repair" below. State at discovery:

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

### Root cause — CORRECTED

My first diagnosis, that a slug-scheme migration re-seeded only 196 of 238, was
WRONG, and the database says so in its own words. Every affected row carries
this `deprecationReason` from a single event at `2026-08-12 21:59:37.418`:

> "Audit 2026-08-12: ACTIVE PROBE identity with NO probe_assets row —
> unservable by findBestProbe (which filters ACTIVE then joins content), so it
> occupied a serving slot it could never fill. Reversible: set status back to
> ACTIVE. NOTE: not a slug-scheme issue — 4-part slugs are the normal form; the
> defect is the missing content row."

So the deprecation was a DELIBERATE and CORRECT audit action against *hollow*
identities — identity rows with no `probe_assets` content. It removed rows that
could never serve. What it could not do was supply the missing content, so the
42 concepts were left with no servable gradeable probe at all.

Only 2 of the 42 had any deprecated row with real content; the other 40 were
hollow. Reactivation alone was therefore never the fix — the content had to be
inserted.

### It is NOT an authoring gap

Verified against the repo: **all 42 have authored gradeable probes** in
`AUTHORED_PROBES`. `gateAssessmentIsServerOwned.test.ts:152` already asserts
every physics concept with an authored probe has at least one gradeable one
(238/238) and passes. The offline invariant was sound; only the production
seeding run was incomplete.

### Affected concepts (42, all now served)

- `phys.particle.*` — 16 (the entire Particle Physics domain)
- `phys.stat.*` — 14
- `phys.mod.*` semiconductors — 6
- `phys.qm.*` — 4 (`density-matrix`, `quantum-tunneling`, `s-matrix-basics`, `selection-rules`)
- `phys.mech.displacement`, `phys.mech.hookes-law` — 2

### Repair — AUTHORIZED AND COMPLETED

Owner authorized the re-seed on 2026-08-16. Executed against production via
Supabase MCP (the sandbox has no `DATABASE_URL`, so the seed script could not be
run directly; every statement replicated its exact row shape — same
`buildProbeSlugResolver` identity, `hashContent`, `SEED_AUTHOR_ID`,
`HUMAN_CURATOR`, tags and `NOT EXISTS` skip semantics).

Two passes were needed, and the second one is the interesting part:

1. **Insert** authored gradeable probes for the 42 concepts. Guarded by
   `WHERE NOT EXISTS` on `canonicalSlug`, exactly as the seed script skips.
   Result: 196 → 234 concepts served.
2. **Backfill + reactivate** the last 4. `phys.mod.diode-rectification`,
   `phys.particle.electroweak-unification`, `phys.particle.feynman-diagrams`
   and `phys.particle.hadron-quark-model` each had their
   `misconception_probe:en:high` slug held by a hollow DEPRECATED row, so the
   insert was correctly skipped and they stayed unserved. **This is the trap
   that would have defeated a plain re-run of the seed script**: its skip check
   matches on slug regardless of status, so a hollow deprecated row makes the
   concept permanently unseedable. Fixed by inserting the missing
   `probe_assets` content against the existing identity and then setting it
   ACTIVE — precisely the reversal the audit's own note described, now valid
   because the content exists.

**Verified after the write:** physics 238/238, chemistry 186/186,
0 duplicate ACTIVE canonicalSlugs, 0 hollow ACTIVE probe identities, chemistry
unchanged at 372 ACTIVE probe rows.

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

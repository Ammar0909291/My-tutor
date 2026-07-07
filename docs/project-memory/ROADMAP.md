# Roadmap — Educational Brain

> Condensed phase/milestone roadmap. The authoritative architecture roadmap
> is `docs/educational-brain/11-risks-and-roadmap.md` (doc 11). This file is
> the short, living status view; doc 11 is the design record.

---

## Phase 1 — Architecture ✅ COMPLETE
12 design docs under `docs/educational-brain/` (README + 01–11). Verdict A
recorded in doc 11 §13: "approve, start milestone 1." Read-only reference —
do not redesign without documented evidence of a flaw + approval.

## Phase 2 — Milestone 1: spine + asset catalogue for ONE subject (physics) 🟡 IN PROGRESS
Data-side scope (doc 10 §9 steps 1–3, physics only):
- [x] Additive `Eb*` Prisma schema (22 models), pushed via `db push`.
- [x] `scripts/seed-eb-physics.mjs` — EbConcept/EbConceptEdge (29 nodes) +
      EbMisconception/EbConceptMisconception (4 / 6 links), verified in DB.
- [x] Bootstrap project-memory (PROJECT_STATE/NEXT_ACTION/CHANGELOG +
      this ROADMAP + TEST_RESULTS).
- [x] Validation re-verified: tsc clean, 2066 offline assertions passing.

Remaining Milestone-1 scope (NOT started — this is the next chunk):
- [ ] Decision Pipeline runtime, stages 0–2 (Frame / Intent / Retrieval),
      physics-only, read-only against `Eb*`, behind `ENABLE_EDUCATIONAL_BRAIN_PIPELINE`
      (default off). Additive — must not modify `/api/learn/chat`.
- [ ] `EbCurriculum`/`EbModule` backfill for physics (doc 10 §9 step 4).
- [ ] Confirm `pgvector` availability, then add deferred `embedding` columns.
- [ ] Minimal Composition + Persist so one retrieval-only turn serves
      end-to-end and is measured against doc 03 §8 (p99 ≤ 600ms) — the
      doc 11 §2 Milestone-1 success criterion.

See `NEXT_ACTION.md` for the exact next step and the explicit out-of-scope list.

## Phase 2 — later milestones / Phase 3+ 🔒 NOT STARTED
Require explicit user approval before beginning (standing instruction).
Includes doc 10 §9 steps 6–9 (dual-write migrations, legacy cache
retirement — "Phase 2 month 5+") and multi-subject expansion.

# Architecture — Authority Index

*ISS-06 (masterplan P1). This file answers one question: **when two documents
here disagree, which one wins?** It is an index, not a summary — it
deliberately restates no content, because a summary that drifts from its
source is worse than no summary.*

---

## 1. The authority ladder

Higher entries win. A lower document that contradicts a higher one is a bug in
the lower document.

| # | Document | Owns | Status |
|---|---|---|---|
| 1 | `EOS_V2_ARCHITECTURE.md` | The 8 Constitutional Laws, the 4 planes, the turn pipeline's shape, band semantics | **Frozen** |
| 2 | `EOS_V2_RUNTIME_SPECIFICATION.md` | Runtime behaviour: invariants I-*, verifier rules V-*, failure handling P-*, testing T-*, BrainConfig defaults (§18) | **Frozen** |
| 3 | `CEKR_CANONICAL_EDUCATIONAL_KNOWLEDGE_REPRESENTATION.md` | Knowledge representation: entity kinds, edge kinds, envelope, validation V-1…V-16, revision model | **Frozen** |
| 4 | `EOS_IMPLEMENTATION_MASTERPLAN.md` | Milestone definitions, dependency order, per-milestone Definition of Done | Living |
| 5 | `EDUCATIONAL_BRAIN_BIBLE.md` + `ADR_*.md` | The pre-EOS Educational Brain v1.0 architecture | Frozen v1.0 |
| 6 | Everything else in this directory | Analysis, audits, proposals, reports | Advisory |

**Frozen** means: implement it, do not redesign it. A gap found while
implementing a frozen document is a **spec bug** — file it against that
document; do not invent behaviour to cover it (RS closing note).

## 2. Where the answer actually lives

| Question | Authority |
|---|---|
| What may a rule in band N do? | Architecture §6 (semantics), RS §5 (evaluation order, conflict resolution) |
| What must never happen at runtime? | RS §14 (invariants) — each maps to a test |
| What may the renderer emit? | RS §9 (verifier rules), enforced by `src/lib/kernel/verifier` |
| What happens when a subsystem fails? | RS §12 (P-0…P-8) |
| What is a default value? | RS §18 — the **only** normative source for constants |
| What does a milestone have to prove? | Masterplan §2 (its DoD line) and §10 |
| What is a Concept / Explanation / Misconception, exactly? | CEKR §2–§3 |
| Which subsystem may import which? | RS §13 (contracts) + its global dependency law |

## 3. Code that IS the authority

Some questions are settled by an implementation, not a document. These are
single-owner by design; a second implementation is a defect, not a
refactoring opportunity.

| Decision | Sole owner |
|---|---|
| "What move is this turn?" (ladder → PolicyMove) | `src/lib/kernel/policyMove.ts` |
| Band evaluation, conflict resolution, completeness | `src/lib/kernel/policy/engine.ts` |
| The active rule set for this process | `src/lib/brain-compiler/registry.ts` (`runtimePack()`) |
| Question-stage ceiling per phase | `src/lib/kernel/tsm/phases.ts` |
| May this turn ask a question? (QL-1…QL-4) | `src/lib/teaching/questionLegality.ts` |
| Capability lattice transitions | `src/lib/evidence-spine/fold.ts` (`foldCapability`) |
| Capability vocabulary, prerequisite DAG, concept binding | `src/lib/teaching/capabilityModel.ts` |
| Failure-state utterance classification | `src/lib/teaching/recoveryGuard.ts` |
| Degraded-mode template bodies | `src/lib/kernel/verifier/templateFallback.ts` |
| Affect band | `src/lib/kernel/frustration.ts` |

## 4. Documents that no longer decide anything

Kept for history. Do not implement from them, do not cite them as
justification, do not "reconcile" current work with them.

- Anything marked *superseded* in the Bible's ADR index.
- `ADR_04_NEXT_BEST_ACTION_RETIREMENT_PROPOSAL.md` — documentation-only by
  standing owner decision; never to be executed.
- `docs/architecture/eos-v3/` — a clean-sheet exploration. **v2 is what is
  being built.** v3 exists to have been argued with, not to be implemented;
  where it contradicts v2, v2 wins by definition of this ladder.
- Audit and completion reports (`*_AUDIT.md`, `*_REPORT*.md`,
  `ENGINEERING_HANDOVER.md`) — evidence about a moment in time, not
  instructions.

## 5. Governance, in one line each

- **G1** — Canonical KG v1 freeze, declared by the Curriculum Production
  Pipeline. Not yet declared.
- **G2** — explicit per-item owner approval before production code lands for a
  gated item. Tracked in `WAVE_0_APPROVAL_CHECKLIST.md`; exceptions granted so
  far are recorded in the project memory, each naming what was approved.
- Frozen documents are amended by a new appendix or ADR that says what it
  supersedes — never by silent edit.

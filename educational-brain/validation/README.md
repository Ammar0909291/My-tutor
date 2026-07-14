# Validation & Gap Audit — Delivery 9

A comprehensive audit of Deliveries 1–8 as one integrated system. Every
prior delivery **authored** knowledge; this delivery **tests** it. It asks
one question of every authored rule:

> **"Where exactly is this stored — and can the runtime retrieve it, or
> does the AI still have to invent it?"**

If the answer is a file and section in this tree, the knowledge is
retrieved. If the answer is "the LLM infers it at runtime," the knowledge
is missing. The ledger in `03-ai-dependency-audit.md` is the measure of
the moat's current depth.

## Method

**Session simulation**: three complete teaching sessions are traced turn
by turn, every decision mapped to its source document and section, every
gap recorded where a source is missing or pending transcription.

**Failure replay**: four failures the platform has already experienced
are re-run through the authored Brain — what would have prevented them,
what was still missing.

**Full inventory**: every teaching decision layer catalogued as
RETRIEVED, PARTIALLY-RETRIEVED, or STILL-INVENTED, with the specific
files responsible.

**Duplication audit**: every place two or more files address the same
content — separated into proper layering (different functional roles) vs.
real redundancy (same rule in the same role in two places).

**Missing knowledge**: human teaching science domains that are absent
from the Brain entirely — not pending transcription, but never authored.

**Highest-ROI recommendation**: the single authoring step that would
move the most improvisation to retrieval.

## Summary of findings

| Dimension | Finding |
|---|---|
| Session traceability | 100% of decisions have an authored rule to point at; ~40% of those rules are cite-only references to Deliveries 1–2 pending transcription |
| Failure replay | 4 platform failures replayed; 3 fully preventable by knowledge already in-tree; 1 preventable only after Delivery 1 transcription |
| AI dependency | 22 retrievable rule layers authored; 13 universal engines pending transcription; 3 categories of authorized residue |
| Duplication | 2 real redundancy issues found (both resolvable at Delivery 1/2 transcription); 5 apparent duplications confirmed as proper layering |
| Missing knowledge | 10 human teaching science domains never yet authored, ranked by learner impact |
| Highest-ROI next step | Transcribe Deliveries 1–2 into `foundations/` — single delivery that resolves 13 pending dependencies across every existing file |

## Reading order

| File | Contents |
|---|---|
| [01-session-simulations.md](01-session-simulations.md) | Three complete teaching sessions, every turn traced to its source |
| [02-failure-replay.md](02-failure-replay.md) | Four platform failures re-run through the authored Brain |
| [03-ai-dependency-audit.md](03-ai-dependency-audit.md) | The complete retrieved-vs-invented inventory |
| [04-duplication-audit.md](04-duplication-audit.md) | What is proper layering and what is real redundancy |
| [05-missing-knowledge.md](05-missing-knowledge.md) | Human teaching science domains not yet authored |
| [06-highest-roi-recommendation.md](06-highest-roi-recommendation.md) | The single highest-ROI next authoring step and its evidence |

## Scope and limits

This audit covers: the complete in-tree Brain as of Delivery 8 —
`assessment/`, `concepts/`, `first-lesson/`, `decision-engine/`,
`student-state/`. It cites Deliveries 1–2 by name (as the tree's README
records they are pending transcription) and treats every cite-only
reference as a gap to be measured. It does not audit the runtime code,
the architecture ADRs, or the Curriculum Production Pipeline — those are
a separate system, documented in `docs/architecture/`.

## Document 07 — Architecture Audit (added after Deliveries 9–10)

`07-architecture-audit.md` is a cross-system audit that reads both the
authored Brain (Deliveries 1–10) AND the actual runtime code (`route.ts`,
`teaching-engine/index.ts`, `placement.ts`, `teachingStrategy.ts`,
`curriculum/route.ts`, `onboarding/route.ts`, `getDashboardV2Data.ts`)
and compares what the Brain says should happen against what the code does.

It covers:
- Complete runtime trace for a Library mode learner
- 8 ranked AI-reasoning gaps (what the AI still invents that authored
  knowledge could replace)
- Human tutor micro-decision audit for three concepts
  (letter-sound correspondence / fractions / Newton's First Law)
- Orchestration audit (the orchestrator exists; the content does not reach
  it — the disconnection mechanism named precisely)
- Reorganization vs. new library analysis (no new library warranted; the
  AssetIdentity pipeline is the right bridge)
- Unnecessary reteaching: three identified patterns (invisible restart,
  premature TRUE_MASTERY, stalemate loops back to same concept)
- Architect review: 8 findings, gap summary table, 7-step priority order

The audit's honest conclusion: 0 of the 52 authored retrievable layers
are retrieved at runtime today. The connection paths that need to be
activated (not built from scratch) are: AssetIdentity EXPLANATION + PROBE
import from `concepts/`, first-lesson constraint enforcement in route.ts,
Library mode binary-search placement, and `decide()` firing unconditionally
for Library mode.

## Document 08 — Evidence Architecture (added under the First-Principles Review)

`08-evidence-architecture.md` re-evaluates the entire Brain against the
First-Principles Review's standard: not document quality but "does this
component generate proprietary educational evidence no general AI can
possess?" Contents: a moat classification of every library (HIGH /
MIXED / SPLIT / LOW as evidence producers); the unified per-component
evidence contract (what every component owes after each teaching
interaction — consolidating the contracts already scattered in
decision-engine/08 §3, student-state/06 §7, decision-engine/05 law 3,
first-lesson/08); eight missing evidence loops where the Brain teaches
but learns nothing (recovery never aggregates; anti-analogy lists don't
grow from Type-6 births; no per-concept decay norms; the 27-action
catalog has no outcome table; decisions never joined to consequences;
placement priors never retune; curriculum feedback is prose not events;
voice evidence structurally forfeited); the authoring pivot (skeleton-
first concept entries — instruments before prose — amending
concepts/COVERAGE.md's quality bar); and the million-student answer
(seven bodies of knowledge that could exist nowhere else). The
entry-as-falsifiable-predictions reframe: every authored claim in a
concept entry states its test.

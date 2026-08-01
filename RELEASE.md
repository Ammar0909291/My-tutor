# Release — Implementation Program v2 (WP-0 … WP-9)

**Branch:** `claude/teaching-quality-architecture-xd00jx`
**Base:** `main @ 827f3796`
**Tip:** `1107afd3`
**Size:** 15 commits · 46 files · +4585 / −37

---

## 1. Executive summary

This release implements the capture, persistence and evaluation layers of the
canonical Phase 1–4 architecture.

**Almost all of it is inert.** With one exception — a single system-prompt
instruction, behind a flag — no teaching decision, response, prompt or API
differs from `827f3796`. Nothing is applied, adapted, admitted or enforced.
The packages build the instruments that later, separately-gated work will read.

Three properties define the release's risk profile:

- **One behavioural surface.** `route.ts` is `+46 / −0`, and every added line
  is the gated instruction, the ungated tag strip, two hoisted variables and
  two payload spreads on the existing `emitTurn()` call.
- **One additive migration.** Four nullable columns on two existing tables.
  No table, no model, no backfill, no column dropped or retyped.
- **One reversible switch.** `ENABLE_ATTEMPT_CAPTURE=0` returns the prompt to
  byte-identical-with-production in seconds, without a deploy.

---

## 2. What changed

| Package | Delivered |
|---|---|
| WP-0 | 31 cross-owner handoff items drafted into the Wave 0 checklist as "Wave H" |
| WP-R | Reconciliation of the Evidence Spine against 13 per-turn capture subsystems |
| WP-1 | Documentation corrections: H-3, VH-5, AH-5, AH-9, AH-4, EH-3 |
| WP-2 | CT-1…CT-4 filed against CEKR §10's `Conflict` node (Appendix C, all `OPEN`) |
| WP-3 | `DecisionRecorded` payload v2 — four optional fields, one event, one turn |
| WP-4 | Four nullable persistence columns (carriers, no writer) |
| WP-5 | Read-only shadow evaluators — Phase 1 Stage 2, Phase 2 V2, Phase 3 S2 |
| WP-6 | EH-1 authored-demand input, EH-2 sufficiency read model |
| WP-7 | VH-1/2/3/4/7 — `VisualIntent`, `VisualAvailability`, RRM intent |
| — | WP-8 prerequisite: the first runtime reader for `BrainConfig` |
| P1-1 | AttemptVector capture as a declared self-report |
| WP-8 | AH-1 typed ASV, AH-11 policy rules (exported, unregistered), S3–S7 shadow |
| WP-9 | Phase 1 Stage 3–7, Phase 2 V3–V6, H-2 |
| B-1 | Fix: the declaration tag could reach the learner |

---

## 3. Runtime-visible changes

**Exactly one, and it is flag-gated.**

`route.ts` appends one capture instruction (~1172 characters) to the system
prompt per turn, soliciting an invisible declaration tag. The tag is stripped
before the reply is stored, rendered or parsed further.

- With `ENABLE_ATTEMPT_CAPTURE` unset or any value other than `"0"`: the
  instruction is appended.
- With `ENABLE_ATTEMPT_CAPTURE=0`: the instruction is not appended and no
  vector is captured. **The prompt is byte-identical to pre-release.**

Nothing reads the captured vectors on the live path, so no teaching decision
differs in either state. The model's *input* is not byte-identical when the
flag is on, and that is the whole of this release's behavioural exposure.

Two supporting changes with no observable effect:

- `writer.ts` stamps `schemaVersion` per event type. It previously hardcoded
  `1` for all twelve types, which would have made any version bump a silent
  no-op. `DecisionRecorded` rows now carry `schemaVersion: 2`.
- `coveragePercent` is **unchanged** and reinterpreted, not replaced (EH-2).

---

## 4. Shadow-only changes

Verified: **zero runtime importers**, so none of this executes in production.

| Module | Reachability |
|---|---|
| `teaching/evaluation/*` (7 modules) | Unreferenced — offline evaluators |
| `teaching/adaptation/{governor,policyRules,shadowStages}` | Unreferenced — shadow control plane |
| `config/brainConfig.ts` | Unreferenced — policy-store reader, first consumer is gated |
| `teaching/assets/sufficiency.ts` | Unreferenced — read-only analytics |
| `teaching/visualIntent.ts` | Type-only (`import type`), no runtime coupling |
| `teaching/adaptation/asv.ts` | Parser only is live; the rest is shadow |
| `teaching/attemptVectorSignal.ts` | **Live** — the only campaign code on the request path |

`PHASE3_GOVERNOR_RULES` is exported and deliberately **not** registered into
the policy pack: AH-11 makes wiring the runtime owner's decision. Verified: 0
occurrences under `src/lib/kernel/`.

---

## 5. Database migration summary

**One migration:** `20260801000000_wp4_persistence_carriers`

```sql
ALTER TABLE "concept_mastery_records" ADD COLUMN "adaptationState" JSONB;
ALTER TABLE "concept_mastery_records" ADD COLUMN "representationDependence" TEXT;
ALTER TABLE "evidence_events"        ADD COLUMN "scaffoldLevel" INTEGER;
ALTER TABLE "evidence_events"        ADD COLUMN "hintDebt" INTEGER;
```

- All nullable, no `DEFAULT`, no index, no constraint, no backfill.
- On PostgreSQL, `ADD COLUMN` with no default is a catalogue-only change —
  no table rewrite, no long lock.
- Ordering correct: `20260801000000` sorts after `20260720103826`.
- **These four columns have no writer.** `NULL` means "not captured", never a
  default. They are carriers for gated work.

---

## 6. Environment variables

**One new variable, optional:**

| Variable | Default | Effect |
|---|---|---|
| `ENABLE_ATTEMPT_CAPTURE` | enabled (unset ⇒ on) | `"0"` disables the declaration tag; prompt reverts to pre-release |

Read at exactly one place: `attemptVectorSignal.ts:84` (`!== '0'`), consumed at
`route.ts:1466`. Follows the repository's established opt-out form
(`ENABLE_EVIDENCE_SPINE`).

No other variable was added, renamed or removed. `package.json`,
`tsconfig.json`, `next.config.js` and `vercel.json` are unchanged by this
release.

---

## 7. Deployment order

Automatic and pre-existing — `vercel.json:3`:

```
prisma generate  →  prisma migrate deploy  →  next build
```

The migration runs **before** the new code serves traffic. That ordering is
what makes this release safe, and it was not introduced here.

**Production deploys from `main`** (`CLAUDE.md:1874`), so merging to `main`
**is** the deploy trigger. Consequence: any environment variable intended to
govern the first deployment must be set in Vercel **before** the merge.

No manual deployment steps beyond the dashboard actions in §12.

---

## 8. Rollback plan

Three levels, increasing cost. L1 will almost certainly suffice.

**L1 — Flag (seconds, no deploy)**
Set `ENABLE_ATTEMPT_CAPTURE=0`. The instruction stops being appended; nothing
is captured. Tag stripping stays active by design, so a tag emitted from
conversation context still cannot reach a learner.

**L2 — Code revert (one deploy)**
Revert the merge. **Leave the migration in place.** Safe because the four new
columns have zero writers and zero readers — pre-release code is unaffected by
their presence.

**L3 — Schema revert (not recommended, not needed)**
Dropping the columns would be a destructive operation to undo an additive one.
No scenario in this release requires it.

**One rollback caveat.** After L2, `CURRENT_SCHEMA_VERSION.DecisionRecorded`
reverts to `1`, so v2 spine rows written during the live window fail
`decodable()` (`fold.ts:128-131`) and are counted in `eventsSkipped` rather
than folded. Impact today is nil — `foldAll`/`foldEvents` have **no**
production caller (only `replay.ts`, which itself has none), and the one live
spine reader, `spineSignals.ts:140`, does not filter on `schemaVersion` and
reads only v1 fields that v2 payloads still carry. Recorded so it is not
discovered later.

---

## 9. Post-deployment validation checklist

- [ ] Migration applied — `_prisma_migrations` contains
      `20260801000000_wp4_persistence_carriers` with `finished_at` set and
      `rolled_back_at` null
- [ ] One chat turn end-to-end; reply renders normally
- [ ] **CRITICAL — tag leakage.** This is the B-1 regression surface:
      ```sql
      SELECT count(*) FROM messages
      WHERE role = 'ASSISTANT' AND content LIKE '%<!--ATTEMPT%';
      -- expect 0
      ```
      Non-zero ⇒ execute L1 immediately, then report.
- [ ] Control query for `'%<!--SIGNAL%'` — also expect 0; non-zero indicates a
      pre-existing issue, not this release
- [ ] SpineEvent rows still appending; `DecisionRecorded` rows carry
      `schemaVersion` 2
- [ ] The four new columns remain `NULL` everywhere (a non-`NULL` value would
      mean an unintended writer exists)
- [ ] Provider mix unchanged (memory vs groq) — the Explanation Memory path
      was not touched

---

## 10. Known limitations

- **Four production columns ship with no writer.** AH-2's "the ASV is
  persisted" is satisfied by nothing in this branch; `projectStandingAsv` is
  pure and returns the value rather than writing it. Graded Important, not
  blocking, at the merge gate.
- **`TAG_RESIDUAL_RE` truncates rather than exposes.** An unterminated tag
  mid-reply removes the remainder of the text. Fail-safe direction; the
  instruction requires the tag on its own final line.
- **Captured vectors are `PROXY` honesty class**, not instrumentation. They
  are authoritative on what was intended and are no evidence of what was
  achieved. TQ-5's gate G3 retains its `MEASURED` semantic half for exactly
  this reason.
- **G1 (Canonical KG v1 freeze) is not declared** — `campaign_version:
  1.0.0-draft`, 1 of 6 subjects frozen. Externally owned; nothing in this
  release advances it.
- **G2 is unsigned.** 15 items are implementation-complete and awaiting owner
  signature; 6 are carrier-only and must not be signed as complete. Merging
  this branch checks no box.

---

## 11. Production risks

| # | Risk | Likelihood | Impact | Status |
|---|---|---|---|---|
| R1 | Prompt growth nudges model output or token cost | Medium | Low | Mitigated — flag, no deploy |
| R2 | Tag leakage to a learner | Low | High | Mitigated — B-1 fixed at source, 5 regression tests, §9 check |
| R3 | Four dead columns in production | Certain | None | Accepted |
| R4 | Migration lock | Very low | Low | Catalogue-only ADD COLUMN |
| R5 | ~4400 lines of shadow code in the server build | Certain | None | Accepted, verified inert |

**Not a risk, verified:** no change to the Evidence Engine, the Educational
Brain pipeline, the kernel, `contextSnapshot`, or any public API. Backward
compatibility during a rolling deploy is unconditional — old code ignores the
new nullable columns, and new code writes none of them.

---

## 12. Vercel deployment checklist — MANUAL, BEFORE MERGING

**These must be completed before the merge, because merging `main` triggers
the production deploy.**

- [ ] **Set `ENABLE_ATTEMPT_CAPTURE = 0`** on the Production environment.
      This is the dark launch. Without it, the first deploy ships with capture
      enabled, because an unset variable reads as enabled.
- [ ] **Confirm Production Branch is `main`.** `CLAUDE.md:1874` records that
      this needs a human with dashboard access — no automated session in this
      environment has held Vercel credentials to verify or change it.
- [ ] Confirm `DATABASE_URL` and `DIRECT_URL` are present (required by
      `prisma migrate deploy` during the build).
- [ ] Confirm no build-command override exists that would skip
      `prisma migrate deploy`.

---

## 13. Merge checklist — repository maintainer

- [ ] §12 complete, `ENABLE_ATTEMPT_CAPTURE=0` confirmed set
- [ ] `git fetch origin && git log --oneline -1 origin/main` → `827f3796`
- [ ] No conflicts: `git merge-tree $(git merge-base HEAD origin/main) HEAD origin/main`
- [ ] Merge with history preserved:
      ```
      git checkout main
      git merge --no-ff claude/teaching-quality-architecture-xd00jx
      git push -u origin main
      ```
      Never force-push, never rebase public history, never squash
      (repository branch policy).
- [ ] Watch the Vercel build; confirm `prisma migrate deploy` reports the new
      migration applied
- [ ] Run §9 immediately after the deploy goes live
- [ ] Only after §9 is clean, consider removing `ENABLE_ATTEMPT_CAPTURE` (or
      setting it to `1`) as a separate, instantly-reversible change

---

## 14. Operator runbook — first 24 hours

**Golden rule:** every symptom below is resolved by L1 first. Setting
`ENABLE_ATTEMPT_CAPTURE=0` takes seconds, needs no deploy, and returns the
prompt to pre-release. Diagnose afterwards.

| Symptom | First action | Then |
|---|---|---|
| `<!--ATTEMPT` visible in a reply or stored message | **L1 immediately** | Capture the exact message text; it is the B-1 regression surface and the fix is regression-tested, so a real occurrence is new information |
| Replies look truncated or end abruptly | **L1** | Check for an unterminated tag — `TAG_RESIDUAL_RE` truncates rather than exposes |
| Model output quality drops, replies drift off-format | **L1** | This is R1; the prompt is the only changed input |
| Token cost or latency rises noticeably | **L1** | ~1172 characters per turn is the only addition |
| Build failed at `prisma migrate deploy` | Do not retry blindly | Check `_prisma_migrations` for a partially-applied row; the migration is 4 independent `ADD COLUMN`s and is safe to re-run |
| A new column shows a non-`NULL` value | Investigate before acting | Nothing should write them; a value means an unintended writer exists |
| Chat 500s / turns failing | Check whether it predates the deploy | This release adds no throw path: the tag parser is total, the spine writer is fire-and-forget, and the strip cannot fail a turn |
| Spine rows stop appending | Not caused by this release | `ENABLE_EVIDENCE_SPINE` governs it and is unchanged |

**Escalation to L2 (revert the merge)** only if L1 does not resolve the
symptom, or if the symptom is not in the table above and correlates with the
deploy. **Leave the migration in place** — see §8.

**Do not attempt L3.** No scenario in this release requires dropping a column.

**What is safe to ignore in the first 24 hours:** empty values in the four new
columns (expected — no writer), `eventsSkipped` counts in any offline fold
(no production caller), and shadow modules never appearing in logs (they have
no runtime importer).

---

## 15. Support notes

- The one behavioural change is the prompt instruction. If in doubt about any
  symptom, `ENABLE_ATTEMPT_CAPTURE=0` restores pre-release prompt behaviour
  without a deploy, and stripping continues to run so nothing can leak.
- Validation evidence for this release: `npx tsc --noEmit` 0 errors;
  `npx vitest run` 166 files, 3436 passed, 9 skipped; `npm run build`
  succeeded.
- Full per-package detail: `CHANGELOG.md`.
- Reconciliation of capture paths:
  `docs/architecture/WP_R_RUNTIME_RECONCILIATION.md`.
- Governance state: `docs/architecture/WAVE_0_APPROVAL_CHECKLIST.md`.

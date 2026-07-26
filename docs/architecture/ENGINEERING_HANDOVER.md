# Engineering Handover — "Pappu" Engineering Program

**Date:** 2026-07-26
**Scope:** runtime, infrastructure, security, performance, reliability engineering for My Tutor.
**Explicitly out of scope throughout:** Mathematics/Physics/Chemistry/English/Biology/Computer
Science curriculum content — Knowledge Graph authoring, Blueprint authoring, Educational Brain
concept-entry authoring. Mathematics remained Mohammad's exclusive ownership; this program never
modified Mathematics content.

This document is the permanent handover record. See also:
`docs/architecture/ENGINEERING_RUNBOOK_BLOCKED_ITEMS.md` for exact, copy-paste execution steps for
every item this program designed but could not execute from its sandbox.

---

## 1. Everything Completed

### Production bugs found and fixed (6, all shipped and validated)

| # | Bug | File | Evidence | Fix |
|---|-----|------|----------|-----|
| 1 | Chemistry's Teaching Sequence Executor, Tutor Actions, Discovery Questions, and Assessment Signals were hardcoded to physics-only | `src/lib/curriculum/blueprintLoader.ts` | Direct trace: `hasTeachingPlan()` returned `false` for all 186 chemistry concepts despite identical EB section headings to physics | Removed the `isPhysics` gate — parsers are format-agnostic, no new logic needed |
| 2 | Stale "PHYSICS TEACHING PLAN" string injected into chemistry lesson prompts | `src/lib/curriculum/blueprintLoader.ts` | Live prompt-block trace for 2 chemistry concepts | Renamed to subject-agnostic "TEACHING PLAN" |
| 3 | 10 chemistry visual-registry entries pointed at nonexistent (pre-KG-freeze) concept IDs | `src/lib/teaching/visualRegistry.ts` | `scripts/validate-visualization-coverage.ts` output, cross-checked against live KG | Renamed to real KG ids (1:1 verified), 1 true duplicate removed, 3 legitimate domain defaults added |
| 4 | AI failover chain always attempted OpenRouter even with no configured key, wasting a guaranteed-401 round-trip on every chat turn | `src/lib/ai/router.ts` | Vercel runtime logs: 5 occurrences pre-fix deployment, 0 post-fix (confirmed via `list_deployments` correlation) | Filter candidates to those with a non-empty API key before building the chain |
| 5 | Cold-start asset-bootstrap routine used an unpooled second `PrismaClient`, adding connection pressure at the exact moment traffic also spikes | `src/instrumentation.ts` | Production "Timed out fetching a new connection from the connection pool" errors (2 occurrences, 2026-07-15 & 2026-07-25); root-cause traced to this second, unpooled client | Applied the same `withPoolParams()` helper the main singleton already used |
| 6 | Groq daily-token-quota exhaustion (TPD) misclassified as a retryable rate limit | `src/lib/ai/providers/groq.ts` | Exact production error text captured: "Rate limit reached... on tokens per day (TPD)... try again in 32m37s" | Check message for TPD/quota wording before the generic `RateLimitError` branch → classify as non-retryable `AIQuotaError` |

Every fix above is committed, pushed, and covered by `tsc --noEmit` clean / `npm run build`
succeeded / full vitest suite passing (2131→2133 tests across the program, 0 regressions at any
point) at the time it shipped.

### Security

- **RLS enabled on all 112 public Supabase tables** (previously 109 had it disabled entirely, 3
  had it enabled with no policy). Supabase security advisor: 109 ERROR-level findings → 0.
- Applied as intentional default-deny (RLS enabled, zero policies) — proven safe via a full
  repository access-pattern audit that found **exactly one** database access architecture in this
  codebase: server-side Prisma via a single Postgres role (`postgres`, confirmed
  `rolbypassrls=true`). No Supabase Auth, no PostgREST/anon-key usage, no service_role split
  exists anywhere in the app. Default-deny RLS therefore has zero effect on the real app (which
  bypasses RLS entirely) while closing any hypothetical direct-PostgREST exposure.
- Verified post-migration via direct read-back on a representative sample spanning the most
  sensitive tables: `payments`, `users`, `subscriptions`, `student_progress`, `learn_sessions`,
  `organizations`, `asset_identity`, `eb_concept` — all readable, correct row counts, 0 policy
  drift, 0 accidental policy creation.

### Database reliability

- Root-caused the "Timed out fetching a new connection from the connection pool" production error
  via a full Phase 5 architecture audit (Prisma config, singleton pattern, pool sizing,
  statement/socket timeouts). Confirmed the existing P0 fix (`connection_limit=15`,
  `pool_timeout=20`, `statement_timeout=15000ms`, `socket_timeout=20s`, 2026-07-22) was already
  correctly applied to the main app singleton; found and fixed the one gap (bug #5 above).
- Classified the residual, rare (2 events / 10 days) pool-exhaustion pattern as genuine traffic
  bursts against an already-reasonably-sized pool — explicitly did NOT blindly raise limits
  further without Supabase pooler-mode confirmation (still pending, see §2).

### Explanation Memory

- Verified the full pipeline end-to-end: `AssetIdentity` → `findBestExplanation()`/matcher →
  `assembleLesson()` → `route.ts`'s system-prompt injection. Confirmed correct and unbroken.
- Audited all 694 DRAFT explanation-asset rows (eng/math/phys) against the project's own quality
  gate (`src/lib/teaching/assets/validation.ts`: language support, familyKind validity, minimum
  length, placeholder/degenerate-text detection, concept-id-resolves-against-KG). **All 694 pass
  every check.** Zero were auto-promoted — per your explicit standing decision, promotion stays a
  human review action via `/api/admin/knowledge-assets`.
- Confirmed (twice, across two independent sessions) that no CLI script, migration helper, or
  maintenance job exists that bypasses the admin endpoint — it is genuinely the only supported
  promotion path, by design, not an oversight.

### Visual system

- Ran the project's own dedicated coverage validator against Physics, Mathematics (runtime-only,
  no content touched), and English: 0 incorrect mappings, 0 broken references, 0 duplicates across
  all three. Chemistry's registry was actively fixed (see bug #3).
- Confirmed `detectVisual()`'s subject-gated dispatch cannot leak Physics/Mechanics visual rules
  into a Chemistry-scoped call (disproved a speculative concern from an earlier audit).

### AI routing

- Confirmed the failover chain (Gemini → OpenRouter → Groq) is correctly ordered and that the
  second `routeAI()` call site in `route.ts` (the EOS Output Verifier's constrained rerender) is a
  legitimate conditional path, not wasted duplication.
- Fixed 2 real inefficiencies (bugs #4, #6 above).

### Performance

- Confirmed Blueprint/Educational Brain/Knowledge Graph file reads are already cached at the
  process level (no repeated `fs.readFileSync` found anywhere in the hot path).
- Confirmed the PrismaClient singleton pattern is correctly implemented (no dev-mode hot-reload
  duplication risk).

---

## 2. Remaining Operational Tasks

All four have exact, copy-paste runbooks in
`docs/architecture/ENGINEERING_RUNBOOK_BLOCKED_ITEMS.md` — each executable in under 15 minutes by
anyone with production Supabase/database access:

1. **Chemistry AssetIdentity seeding** — content is complete and script-verified-correct; blocked
   only by this sandbox's lack of raw Postgres TCP access.
2. **Explanation Asset promotion** — 694 DRAFT rows, all quality-gate-passing, awaiting your
   manual review via the admin endpoint (by your own explicit choice to keep this a human
   decision).
3. **Supabase pool-mode verification** — needs dashboard confirmation of Transaction vs Session
   pooling mode and the pooler's own connection ceiling (separate from the app's
   `connection_limit=15` parameter).
4. **Migration-strategy verification** — `npx prisma migrate status` needs to be run against the
   live production DB to resolve a real, unverified doc/reality mismatch (CLAUDE.md says "no
   migration files"; 10 real migration directories exist on disk and `vercel.json` runs
   `prisma migrate deploy` at build time).

## 3. Remaining Curriculum Tasks (Mohammad's ownership — informational only)

- Mathematics: 908 KG concepts total; Educational Brain coverage at 63/82 for the `math.found`
  domain as of this handover (see `educational-brain/concepts/ROADMAP.md` for the live,
  authoritative count — this number moves independently of engineering work and should not be
  treated as frozen by this document).
- Chemistry/Physics/English content (KG, Blueprints, Teaching Assets, Educational Brain) is
  complete per prior sessions' work — not re-verified in this handover beyond what's noted above.
- Biology/Computer Science: Educational Brain coverage not started as of the last check in this
  program (see `ROADMAP.md`).

## 4. Production Status

- **Security:** 0 ERROR-level Supabase advisories (was 109). Strong.
- **Reliability:** 6 real bugs fixed with production evidence; connection pooling hardened; the
  dominant remaining live risk is Groq's daily token quota (200,000 TPD), evidenced repeatedly in
  production logs — this is a billing/plan decision, not an engineering gap.
- **Explanation Memory:** fully built, fully verified, currently serving 0 ACTIVE rows (all
  content sits reviewed-and-ready in DRAFT, pending your promotion decision). This is a real
  completion gap — infrastructure built, content not yet flowing through it.
- **Chemistry:** runtime parity with Physics achieved (Teaching Sequence Executor, visual
  registry, prompt injection all fixed and verified); AssetIdentity seeding still pending (§2).

## 5. Known Risks

1. **Groq TPD ceiling** — recurring production chat failures during quota-exhaustion windows.
   Mitigated (bug #6 — no more wasted retries) but not resolved (billing decision).
2. **Migration-strategy uncertainty** (§2 item 4) — unverified; could be harmless or could
   represent real schema/migration-history drift. Needs resolution before it's forgotten.
3. **Explanation Memory serving nothing** — real students currently get 0 memory-path lessons
   despite 694 ready, quality-verified rows sitting in DRAFT. Every day this sits unreviewed is a
   day the "reduce AI reasoning via authored content" architecture goal (see CLAUDE.md's
   Educational Brain sections) is not actually realized in production.
4. **55 orphan visual-registry keys** (identified, not removed) — plausible legacy School Mode
   entries; removing them without confirming they're truly dead risks breaking an unaudited
   consumer path. Left as-is, documented, not a proven bug.
5. **Supabase pooler mode unconfirmed** — if it turns out to be Session mode instead of
   Transaction mode, that's a real latent scalability risk under concurrent load that the
   `connection_limit=15` app-side fix alone doesn't address.

## 6. Future Engineering Roadmap (not urgent, no active blockers)

- Once Chemistry AssetIdentity is seeded and Explanation Memory promotion begins, verify
  `assembleLesson()` end-to-end in production (not just unit-level) for all 4 subjects with
  ACTIVE content.
- Extend the visual-registry coverage audit methodology (already proven on Chemistry) to Biology
  and Computer Science once their curriculum content exists.
- Revisit the Evidence Engine's actual production data volume once Explanation Memory is live —
  the quality-score/confidence fields in `AssetIdentity` are currently unpopulated at meaningful
  scale (no real serving data to learn from yet).
- Consider extending RLS from "default-deny, no policy" to real per-role policies IF this app
  ever adds a second access path (e.g., a future Supabase-Auth-based client SDK, a public API,
  or a partner integration) — not needed today given the app's single-access-path architecture,
  but the current setup would need real policies the moment that changes.

---

**Engineering program complete.
Further progress now requires operations, infrastructure, billing, or curriculum work.**

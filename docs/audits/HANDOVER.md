# HANDOVER — Physics + Chemistry audit → root-cause fix → moat loop

**Written at** `e9060836` on `main`, tree clean, everything pushed.
**Read this with** `docs/audits/TEACHING_CORPUS_AUDIT_LEDGER.md` — that ledger is
the authoritative record; this file is the entry point into it.

---

## 1. The standing task

Play a real intermediate-English learner against production
(`my-tutor-flame.vercel.app`) through **Physics (238 concepts) and Chemistry
(186)** in KG order. For each topic: find teaching defects, fix **root causes
globally, never topic-specific symptoms**, add regression tests, verify against
production, preserve the moat, move on. Topic states:
`NOT_STARTED / IN_PROGRESS / VERIFIED / FAILED / BLOCKED`. A blocked topic is
never permanently skipped — it goes on the BLOCKED queue with its exact blocker
and is retried every iteration.

**Standing rules that must not be relaxed:**
- Never claim verification that did not happen. Offline measurement and a
  production replay are different sentences and must be reported as such.
- Never fake mastery, fabricate sessions, or manufacture `evidence_events`.
- Never bypass authentication or edit production rows to make an audit pass.
- Use the existing real learner account only — no throwaway production accounts.
- Never print, commit or persist passwords. Credentials reach the harness only
  through `AUDIT_EMAIL` / `AUDIT_PASSWORD` env vars.
- Never weaken or delete a test to get green.
- Never introduce a second teaching engine, resolver, or policy authority —
  extend the existing one.
- Work on `main` only. Never push to a `claude/*` branch, no PRs unless asked.

---

## 2. Where things actually stand

| | |
|---|---|
| Topics VERIFIED | **1 / 424** (`phys.meas.units`) |
| IN PROGRESS | `phys.meas.errors` (Topic 3) |
| BLOCKED | B-3, B-4, B-5 — **B-1 and B-2 closed 2026-08-12** |
| Global root-cause fixes shipped | **31** |
| Suite | 309 files / 6,596 passed / 9 skipped |
| `tsc --noEmit` / `npm run build` | clean |
| Production | `c40c216a` READY, aliased to `my-tutor-flame.vercel.app` |

### The blocker that was just closed — E6
The mastery gate could never be crossed. CHECK and PRACTICE advance only on
graded correctness; the only deterministic grader needs the turn to declare its
own answer key; and producing that key was **delegated to the LLM**, which is
under no obligation. Measured: **E6 × 17 across six topics, 0 of 6 reaching
`verified`**.

A prompt lever was tried first (`09a25296`) and **measured not to work**. The
fix (`c40c216a`) makes the server select the assessment from the authored moat
(`gateAssessment.ts` → `probeToMcq` → attached pre-LLM, model writes the lead-in
only). Guarded by 32 assertions across two test files, including a route-wiring
audit — the module tests alone would have passed with every call site deleted.

**⚠️ E6 = 0 is NOT verified on production.** No real HTTP turn has been replayed
since the fix. That is B-5 below and it is the single most important open item.

---

## 3. BLOCKED queue — retry FIRST every iteration, log the attempt

| id | blocker | required action | acceptance |
|----|---------|-----------------|-----------|
| **B-5** | **egress policy 403s `my-tutor-flame.vercel.app:443` — AND credentials needed.** Credentials ALONE are not enough; this was previously recorded as a credentials-only blocker and that was wrong | run the sweep from an environment whose egress permits the app domain, holding both env vars | `E6 = 0`, ≥1 topic `verified` |
| ~~B-1~~ | **CLOSED 2026-08-12** — asset `f22e5673-…` DEPRECATED, verified 0 ACTIVE rows carry the name | — | done |
| ~~B-2~~ | **CLOSED 2026-08-12** — survey complete: 1,335 curated ACTIVE rows, 0 names, 0 session-bound discourse. All 28 flagged candidates were false positives | — | done |
| B-3 | `DATABASE_URL` unset; pooler state unreadable | verify Supabase pool mode | P1008 cluster explained |
| B-4 | Chromium blocked by the same egress policy (`net::ERR_CONNECTION_RESET`) | screenshots from a machine with ordinary internet | one per topic |

**Retrying the queue is not ceremony.** B-1/B-2 sat blocked for five
iterations on "Supabase MCP lists 0 projects", then the MCP listed a live
project on the sixth and both closed in one turn.

`file://` rendering DOES work — `scripts/audit/shot.mjs` produces faithful
reproductions of real captured payloads. They are **not** screenshots of the
running app and must be labelled that way.

---

## 4. Two decisions only the owner can make

1. **Learner credentials.** Without them no topic can reach VERIFIED, including
   ones whose engine work is already finished. This gates the whole loop.
2. **Activate the three script-only corpora.** `chemistrySeedAssets.ts` (372
   explanations + 372 probes, 186/186 concepts), `biologySeedAssets.ts`
   (216+216, 108/108) and `csSeedAssets.ts` (238+238, 119/119) are complete in
   the repo and **production holds 0 ACTIVE rows for all three**. This is
   deliberate, not a bug: `BOOTSTRAP_SEED_SUBJECTS = ['mathematics','physics',
   'english']`. Expanding it is a one-line change that would insert ~1,652
   **ACTIVE** rows on the next cold start, on content that never passed
   per-asset review. **Do not do this unilaterally.**

---

## 5. NEXT EXACT ACTION

1. Retry B-1…B-5, log the attempt in the ledger.
2. **On credentials:**
   ```
   AUDIT_EMAIL=… AUDIT_PASSWORD=… \
     npx tsx scripts/audit/engine-sweep.ts --subject physics --limit 8
   ```
   Require `E6 = 0` before resuming topic work. Then drive Topic 3
   `phys.meas.errors` to `verified`, preserve the moat, move to Topic 4
   `phys.meas.significant-figures`.
3. **Offline, unblocked** — the batch that was in progress when this handover
   was written, and where to resume it exactly:

   Author a **third gradeable MCQ probe** for the 14 concepts that have only
   two, in the three domains the audit reaches next
   (`phys.mech` 6, `phys.therm` 5, `phys.wave` 3). Closing a concept needs
   THREE graded correct answers (CHECK 1 + PRACTICE 2); with only two
   distinct probes the corpus runs dry mid-lesson and the gate falls back to
   the model.

   The six `phys.mech` targets, each paired with an **already-authored
   misconception that currently has no gradeable MCQ** — so the work is
   converting existing pedagogy into a gradeable form, not inventing new
   pedagogy:

   **The six `phys.mech` concepts are DONE (2026-08-12) — all six now carry
   three gradeable MCQs, ratchet tightened 145 → 139.** The next targets are
   `phys.therm` (5) and `phys.wave` (3).

   **Three errors in the original version of this list, corrected — check the
   source, do not copy these tables forward blindly:**
   - `MC-KE-CONSERVED` does not exist; the real id is
     `MC-KE-CONSERVED-ROTATION`.
   - `MOM_ASSESS_PROBES` was the wrong array — `MOM` is `phys.mech.momentum`
     (which already had 3 probes and was never short). `MC-INTERNAL-EXTERNAL`
     belongs to `conservation-of-momentum` → `COM_ASSESS_PROBES`.
   - Line numbers in this file go stale the moment anyone edits the 49k-line
     `authoredSeedAssets.ts`. Grep for the array name.

   Every new probe must be `probeKind: 'mcq'` with 2–4 choices, exactly one
   `isCorrect`, distractors carrying `misconceptionId`, and a `source` citation.

   **The rule that will bite you:** probe identity keys on
   `conceptId × probeKind × gradeBand × difficulty`. Two probes on one rung
   collapse to ONE identity and one is silently lost — so the new probe needs a
   FREE rung, checked across **every** seed corpus (`brainSeedAssets.ts`,
   `authoredSeedAssets.ts`, and the chemistry/biology/CS files), not just the
   file you are editing. Verify with
   `npx vitest run src/tests/gateAssessment src/tests/difficultyLadderIdentity.test.ts
   src/tests/brainSeedAssets.test.ts`.

   Where the shortfall actually is (measured, per domain — it is NOT flat, and
   the advanced tail is where the bulk sits, blocking nothing near-term):
   ```
   em 32/35  mod 21/21  qm 19/19  particle 16/16  stat 15/15  opt 14/15
   rel 8/8   astro 6/6  mech 6/60  therm 5/18     wave 3/17   meas 0/8
   ```

---

## 6. What the next account should know before touching anything

- **Instruments lie.** Ten false readings were produced in this audit, every
  one caught by reading the source of truth — including `E5 × 16` on the first
  sweep, which was the *checker*, not the product. Two more failed on first run
  while writing the E6 wiring guard, both the test. Verify a marker's
  *occurrence*, not just its presence.
- **The worst instance was the sweep itself** (fixed 2026-08-12, global fix
  #31): with all 8 topics erroring on a proxy denial and zero HTTP requests
  succeeding, it printed *"none — every checked engine invariant held"* and
  exited 0. It now reports INCONCLUSIVE and exits non-zero whenever any topic
  fails to run. If you are about to certify `E6 = 0`, confirm topics actually
  COMPLETED — the count that matters is `checked`, not `total`.
- **B-2's survey flagged 28 candidates; all 28 were false positives.** Read
  every hit before believing it. A capitalised word plus a comma is not a name.
- **The defect meta-classes found so far**: (a) a layer judging a turn from an
  incomplete view of it — four separate sites reading `cleanText` after the
  payload was stripped, plus CUE reading last turn's signal; (b) evidence
  production delegated to a component that may decline. Class (a) is
  essentially exhausted and regression-tested. Class (b) has one member left.
- **Still open, largest unclosed global class**: free-text answers produce no
  recordable evidence at any phase except CHECK and PRACTICE. It no longer
  freezes the ladder (acknowledgement transitions exist and the gates now carry
  MCQs), so it is a *credit* gap, not a *freeze* gap.
- **Predicted, so it is not later reported as a discovery**: `findBestProbe`
  queries `status: ACTIVE` only, so with chemistry at 0 ACTIVE, **E6 will recur
  across all 186 chemistry concepts** the moment the audit reaches that subject.
  Chemistry also carries exactly two gradeable probes per concept, so it hits
  the shortfall universally rather than in the tail.

---

## 7. Running it

```
git checkout main && git pull origin main
cp .env.example .env      # DATABASE_URL, AUTH_SECRET, GROQ_API_KEY
npm install
npx prisma migrate deploy # real migrations, NOT db push
npm run dev               # http://localhost:3000

npx vitest run            # 307 files / 6,575 passed / 9 skipped
npx tsc --noEmit          # clean
npm run build             # clean
npx vitest run src/tests/gateAssessment   # just the newest work
```


---

# RESUME POINT — 2026-08-13, after the E6 root-cause session

Read this section first; the rest of the file predates it.

## The single command that unblocks everything

```
npx tsx scripts/brain/seed-knowledge-assets.ts        # needs DATABASE_URL
```

Idempotent, completes in one run, no lambda lifetime limit. It seeds the ~541
missing seed identities AND fills the 734 hollow probe identities. Everything
below is blocked on it.

Then, and only then:

```
NODE_USE_ENV_PROXY=1 AUDIT_EMAIL=... AUDIT_PASSWORD=... \
  npx tsx scripts/audit/engine-sweep.ts --subject physics --limit 8
```

`NODE_USE_ENV_PROXY=1` is REQUIRED — Node's built-in fetch ignores
`HTTPS_PROXY`, and its absence produced every historical "Host not i…" error.
That was never the app. Require `E6 = 0` before any topic moves to VERIFIED.

## E6, fully root-caused — do not re-derive this

The gate cannot attach an authored MCQ that is not in the database.

| audited concept | gradeable probes in prod | in repo |
|---|---|---|
| `phys.meas.units` | 2 | 4-5 |
| `phys.meas.scalars-vectors` | 2 | 4-5 |
| `phys.meas.vector-products` | 1 | 3+ |
| dimensions, errors, significant-figures, unit-conversion, vector-addition | **0** | 3-5 each |

A gate needs THREE graded correct answers (CHECK 1 + PRACTICE 2). Six of eight
concepts have zero. That is the whole of E6.

## Two mechanisms, both now understood

1. **737 probe identities were ACTIVE with no content row.** `findBestProbe`
   filters ACTIVE then joins content, so they occupied serving slots they could
   never fill. DEPRECATED 2026-08-13 (owner-approved, 0 evidence rows
   disturbed, 796 valid probes untouched).
   **CAUTION: this blocks re-seeding by slug** — those identities still own the
   canonicalSlugs the seed needs, so an `INSERT … WHERE NOT EXISTS(slug)` will
   silently insert nothing. The working operation is FILL-AND-REACTIVATE:
   insert the content row for the existing identity, then set it ACTIVE.
   Proven in production (units 1→2, scalars-vectors 1→2, vector-products 0→1).

2. **The cold-start bootstrap has never once completed** — zero
   `asset bootstrap complete` lines in 24h of logs while
   "seeding missing assets…" appears on nearly every request. `register()` does
   not await it and the lambda freezes when the response is sent, so ~1,500
   writes never finish. Four fixes shipped (prefetch instead of 2,920 queries,
   non-fatal writes, non-fatal status convergence, bounded 40-write slice).
   **Convergence is still STALLED as of this writing** — ten provoked cold
   starts produced zero new writes, and the `asset bootstrap slice:` log line
   has never appeared. Do not assume those fixes work; verify by watching
   `explanation_assets` row count rise on its own.

## Disproved hypotheses — recorded so they are not re-run

- "The orphans are stale 4-part legacy slugs." **FALSE.** 728 probes and 1,335
  explanations use 4-part slugs AND have content; 4-part is the normal form.
  The discriminator is the missing content row.
- "A socket timeout between two writes created the orphans." **FALSE.** The
  bootstrap uses a nested atomic create. All 737 share one authorId and one
  creation day — a single historical seeding event.
- "The gate phase is misclassified." **FALSE.** The corpus is simply absent.

## Upstream cause, owner-only

The Supabase pooler FLAPS: `Can't reach database server at
aws-1-ap-south-1.pooler.supabase.com:6543`, P1008 socket timeouts, and
`connection pool timeout: 20, connection limit: 15` exhaustion — while the
project reports ACTIVE_HEALTHY and direct queries succeed. It has produced
learner-visible 500s and failed sign-ins. It is upstream of the hollow
catalogue, E6, and the outages.

## Verified working today (do not re-investigate)

- Gemini 3.5 Flash Lite is the sole provider (`AI_PROVIDER_MODE=failover`
  restores the chain).
- A completed lesson is learnable again — `lesson-init` re-opens the attempt on
  restart/review. Verified with a real learner turn.
- The invisible two-column teaching canvas is shipped and tested; NOT visually
  confirmed (Chromium is blocked in the agent sandbox).
- Moat: 43 concepts closed, 7 physics domains complete at 3 gradeable probes
  each, 103 remain (em 32, mod 21, qm 19, particle 16, stat 15).

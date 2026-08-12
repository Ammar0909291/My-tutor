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
| BLOCKED | `phys.meas.dimensions` (B-1) |
| Global root-cause fixes shipped | **30** |
| Suite | 307 files / 6,575 passed / 9 skipped |
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
| **B-5** | **no `AUDIT_EMAIL` / `AUDIT_PASSWORD` in the container** | run the sweep from an environment holding them | `E6 = 0`, ≥1 topic `verified` |
| B-1 | needs a DB write to DEPRECATE asset `f22e5673-4b1f-473a-bec8-4fbb9637c0c0` | Supabase MCP lists 0 projects; `DATABASE_URL` unset | asset DEPRECATED, topic re-audited clean |
| B-2 | same — no read path to the 1,589 ACTIVE rows | cross-corpus asset hygiene survey | survey complete |
| B-3 | `DATABASE_URL` unset; pooler state unreadable | verify Supabase pool mode | P1008 cluster explained |
| B-4 | Chromium hangs on outbound HTTPS (`example.com` timed out at 120 s) | screenshots from a machine with ordinary internet | one per topic |

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

   | concept | target misconception (from its blueprint §6) |
   |---|---|
   | `newtons-first-law` | `MC-2` — a stationary object has no forces acting on it |
   | `kinetic-energy` | `MC-KE-NEGATIVE` |
   | `potential-energy` | `MC-HEIGHT-VERTICAL-ONLY` |
   | `conservation-of-momentum` | `MC-INTERNAL-EXTERNAL` |
   | `conservation-of-angular-momentum` | `MC-KE-CONSERVED` |
   | `kinematics-2d` | `MC-TOTAL-VELOCITY-COMPONENT` |

   Insertion points are the per-concept arrays in `authoredSeedAssets.ts`
   (`N1_ASSESS_PROBES` :41084, `KE_ASSESS_PROBES` :41678, `PE_ASSESS_PROBES`
   :41740, `MOM_ASSESS_PROBES` :42050, `CAMOM_ASSESS_PROBES` :42768,
   `KIN2_ASSESS_PROBES` :40763). Every new probe must be `probeKind: 'mcq'`
   with 2–4 choices, exactly one `isCorrect`, distractors carrying
   `misconceptionId`, and a `source` citation. Verify with
   `npx vitest run src/tests/gateAssessment` — the coverage test pins the
   short-concept count as a **maximum**, so authoring more can only ever make
   it pass.

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

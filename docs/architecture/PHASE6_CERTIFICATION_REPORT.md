# Phase 6 — Full Experience & Curriculum Certification

> **UPDATE — the P0 has since been FIXED (commit `55cee14e`).** The body of this
> report is preserved as the certification record that FOUND it, unedited. The
> fix, its root-cause trace, its 90-case before/after and its negative controls
> are recorded in **[PHASE6_P0_FIX.md](./PHASE6_P0_FIX.md)**. The verdict below
> was correct when written; re-certification is the next step.

**Verdict at time of writing: 🟠 NOT READY — FIX REQUIRED.**

One P0 defect was found, proved deterministically, and observed live in
production. It is a systemic architecture defect, so per Phase 6's own rule it
was **proved and measured, not patched**. Everything else certified acceptably.

Primary question: *"Can a real learner reliably learn, recover from mistakes,
request help, progress, earn mastery, and return later across the actual
implemented curriculum without being taught false information or becoming
trapped?"*

**Answer: mostly yes — except that a learner who types one of a small set of
very ordinary phrases is silently switched to a different SUBJECT and taught
that subject's content inside their current lesson.** That is "taught false
information" in the most literal sense, and it is reproducible 100% of the time.

---

## 1. Executive verdict

| | |
|---|---|
| P0 | **1** — discourse-deixis resolver switches the taught subject |
| P1 | 1 — English asset-contract shortfall (CONTENT DEFECT — OWNER REQUIRED) |
| P2 | 1 — cross-domain visual archetype collisions (latent) |
| P3 | 1 — `[ASSESSMENT_RESULT …]` tag leak (**FIXED** this phase) |
| P4 | 0 |

The engine's *integrity* machinery is genuinely strong: across every live probe,
nothing fabricated mastery, nothing completed a lesson without evidence, nothing
trapped the learner, and no phantom figure was claimed. The failure is not in
the evidence spine — it is in **concept resolution**, one layer upstream.

---

## 2. Baseline (Part A) — measured, not assumed

| | |
|---|---|
| HEAD == origin/main | `65a982e4` at start; clean tree |
| Test suite | 423 files, **9,113 passed**, 9 skipped (start) → **9,127 passed** (after this phase's fix) |
| TypeScript | clean (exit 0) |
| Production build | clean |
| Supabase MCP | **lists 0 projects** — direct DB inspection UNAVAILABLE this session |

Curriculum scale, measured from the live KG adapters:

| subject | KG concepts | serving assets | contract v1 PASS |
|---|---|---|---|
| english | 216 | 216 (100%) | **0 (0%)** |
| chemistry | 186 | 186 (100%) | 186 (100%) |
| physics | 238 | 238 (100%) | 238 (100%) |
| **TOTAL** | **640** | **640 (100%)** | **424 (66.3%)** |

The prompt's stated 640 is **confirmed correct**. Note that mathematics (908),
biology (108) and computer_science (119) are also *registered* at runtime; they
are excluded here because they are outside the stated implemented set.

---

## 3. Method, and why the sample is sufficient (Parts B, C)

A full 640-concept × 16-behaviour live sweep is ~10,000 provider calls.
CLAUDE.md's 2026-08-19 record shows a **257**-concept sweep already producing 139
`AIRateLimitError`s and a total teaching outage. Running it would have
manufactured an outage, which Phase 6 rule 16 forbids. So the work was split:

- **Offline, at 100% scale (640/640 concepts, zero provider calls)** — asset
  contract, probe gradeability, per-(concept,band) coverage, visual archetype
  assignment, resolver behaviour. `scripts/qa/phase6-structural-certification.ts`,
  `phase6-discourse-surface.ts`.
- **Live, on a representative sample** — answer integrity, mastery reachability,
  visual identity, long-horizon. Four disposable accounts, all deleted, all
  re-login-verified blocked.

This is sufficient because the P0 was found in the *offline* pass at full scale
and then confirmed live; it is not concept-specific, it is resolver-wide.

---

## 4. THE P0 — discourse deixis switches the taught subject

**Severity P0. Type: RUNTIME DEFECT. Reproducibility: 100%.**

### Observed live (production, disposable QA account)

In a **chemistry** lesson (`chem.found.pure-substances`), the learner typed
`"explain the main idea please"`. The tutor replied:

> "The **Main Idea and Supporting Details** method is a simple way to break down
> a paragraph into a clear, focused summary and the facts that back it up.
> … Look at the figure you see on your screen: a big box that says **"Read the
> entire text carefully"** …"

— with an English reading-comprehension figure attached. **The chemistry lesson
was abandoned and English reading comprehension was taught in its place.** The
identical substitution occurred in the physics lesson.

### Root cause, proved deterministically

`resolveRequestedConceptId` (`src/lib/teaching/concept/requestedConcept.ts`)
treats ordinary lesson *discourse* as a cross-subject topic request:

```
lesson phys.mech.newtons-first-law:
  "explain the main idea please" -> eng.reading.main-idea-and-details
  "what is the point of this?"   -> math.geom.point
```

These phrases are **deixis** — they point at what is already being taught. The
resolver has no notion of that, so it matches them against KG titles corpus-wide.
The Teaching Engine then legitimately opens an excursion, and the visual layer
legitimately attaches that concept's figure. **Every downstream gate behaves
correctly**; they all ask "is this a good figure/explanation of the concept it
claims?" — and it is. The *claim* is what is wrong, one layer up.

### Surface area (measured, `phase6-discourse-surface.ts`)

30 ordinary discourse phrases × 3 lessons = 90 resolutions. All 90 *should*
return null.

| | |
|---|---|
| false positives (non-null) | **15 / 90 (16.7%)** |
| **cross-subject** (the severe form) | **10 / 90 (11.1%)** |
| physics lesson | 5 false positives, **5 cross-subject** |
| chemistry lesson | 5 false positives, **5 cross-subject** |
| english lesson | 5 false positives, 0 cross-subject |

25 of 30 phrases resolve correctly, so the defect is **lexically narrow**
(concentrated on "main idea" and "point") but **triggered by very common
utterances** and **severe in consequence**.

### Why it was NOT patched

Phase 6's own instruction: *"If you discover a systemic architecture defect: STOP
PATCHING. Prove the defect, show its affected surface area, explain the
architectural cause, and report the minimum safe architectural correction."*

Independently, CLAUDE.md records that this exact module is dangerous to edit:
*"Touching the resolver is what produced the L1 qualifier defect; flagged for a
dedicated session."* CLAUDE.md **already carries** the `math.geom.point` case as
a known-deferred defect — this phase establishes that its true consequence is far
worse than recorded (subject substitution, not merely a wrong figure).

### Minimum safe architectural correction (recommended, NOT applied)

The codebase already contains the right concept: `DISCOURSE_NOUNS` in
`visual/requestedTopic.ts` already lists **'idea'**, **'point'**, 'answer',
'step', 'part', 'rule', 'method', 'reason', 'result', 'meaning'. It is applied by
`namedTopicUnknownTo` to the *unresolved-topic* path but **not** by
`resolveRequestedConceptId` to the *KG-title-matching* path — the two paths
disagree about what counts as naming a topic.

Recommended correction, in one place, reusing the existing list rather than
inventing a regex:

1. Apply the existing `DISCOURSE_NOUNS` filter inside `resolveRequestedConceptId`
   at the same point the existing `isMediumUsage` / `isIncidentalWord` filters
   run, so all three "is this really a topic?" filters live together.
2. Extend the surviving-word rule so a phrase whose content words are *only*
   discourse nouns plus generic modifiers ("main", "key", "general", "correct",
   "first", "last") names nothing. `'main'` is currently absent, which is
   precisely why `"main idea"` survives the existing filter.
3. Gate on the excursion path only, so subject-legitimate uses are untouched —
   an English lesson teaching `eng.reading.main-idea-and-details` must still
   resolve normally (it does today, and the same-subject column above shows the
   English lesson produced **0** cross-subject errors).

This must be done with the L1 regression battery in place, in a dedicated
session, with the 90-phrase surface-area script above as its acceptance test.

---

## 5. P1 — English cannot reach mastery from authored inventory alone

**Severity P1. Type: CONTENT DEFECT — OWNER REQUIRED. Not modified (rule 8).**

Measured across the exact corpus `src/instrumentation.ts` writes:

| subject | closed-choice probes/concept | distribution |
|---|---|---|
| english | **1.98** | `{0: 2 concepts, 2: 214 concepts}` |
| chemistry | 3.69 | `{3:86, 4:72, 5:27, 6:1}` |
| physics | 3.41 | `{3:146, 4:88, 5:3, 6:1}` |

`assetContract.ts` requires **3** (`correctAtCheck >= 1` + `correctAtPractice >= 2`,
with no re-asking). English holds exactly **2** for 214 of 216 concepts — a
perfect template signature (1 `mcq` + 1 `misconception_probe`). This is the same
defect that module's own header documents for mathematics pre-fix; chemistry and
mathematics were remediated, **English never was**.

**Consequence, and the honest correction to a first reading:** this does *not*
make English mastery impossible. `route.ts:4250` (`mcqHoisted = gateMcqHoisted ??
mcqParse.mcq`) means a model-emitted `<!--MCQ-->` tag is also gradeable.
Live-verified on `eng.grammar.nouns`: 4 distinct graded questions were served —
2 authored (`provider: gate`) + 2 model-authored — and the learner reached
`correctAtCheck = 2`. So English mastery is **reachable but contingent on model
compliance**, which is exactly the dependency the asset contract exists to
remove, and which this repo has measured at **3 of 7 opportunities**.

Fix is content authoring (one more closed-choice probe per English concept),
which rule 8 protects. **Owner decision required.**

---

## 6. P2 — cross-domain visual archetype collisions (latent)

**Severity P2. Type: RUNTIME DEFECT (latent). Not fixed — see below.**

`conceptRepresentations` assigns figure archetypes by keyword, and science
technical terms are ordinary English-teaching vocabulary:

| English concept | assigned archetype | colliding term |
|---|---|---|
| `eng.phonetics.phonetic-transcription` | `dna` | *transcription* |
| `eng.literature.dramatic-structure` | `force_diagram` | *tension* |
| `eng.phonics.sight-words` ("High-Frequency") | `wave` | *frequency* |
| `eng.writing.paragraph-structure` | `cell` | *structure* |

Not all are wrong — `wave` for `eng.phonetics.*` (speech sounds) is defensible.
But `dna` for phonetic transcription is not.

**Why P2 and not higher:** across 11 measurable live turns, the *only* figures
served came from the P0 excursion path, and the concept-appropriate generation
path never fired (generation remains disabled in production pending an env var,
per CLAUDE.md). The collision is therefore **latent** — it becomes learner-facing
the moment `ENABLE_AI_SCENE_GENERATION` is set. Reported now precisely because
enabling that flag is a one-line change that would promote this to P1.

---

## 7. P3 — `[ASSESSMENT_RESULT …]` leaked to learners (**FIXED**)

**Severity P3. Type: RUNTIME DEFECT. Fixed with regression tests.**

Observed live on `eng.grammar.nouns`; the learner's chat bubble ended with:

> …how countable and uncountable nouns affect article use and quantifiers.
> `[ASSESSMENT_RESULT correctness=1 reasoning=2 confidence=3]`

**Root cause, clustered rather than patched per-tag:** `route.ts` instructs the
model to emit **three** square-bracket tags and strips only two — `[HINT]` via
the hint parser, `[LESSON_COMPLETE]` via dedicated handling, and
`[ASSESSMENT_RESULT …]` **via nothing**. `residualTagSweep.ts` — whose header
claims it fixes leaks *"absolutely, for every tag family, including ones not
invented yet"* — covers only the `<!--…-->` and `<visual>` **shapes**. The
bracket shape was a third shape it never covered. Worse,
`hasResidualMachineTag` reported the leaked text as **clean**, so the
repository's own assertion was blind to the entire class.

The codebase already knew: `kernel/verifier/lexicons.ts` carries a
`BRACKET_TAG_PATTERN` and a V-TAG rule ("any bracketed tag not in this list is
STRIPPED") — but the K5 verifier is **off by default**, so it never runs on the
serving path.

**Fix:** extended the always-on sweep to the bracket shape at the shared root,
plus closed the detector blindness. `src/tests/bracketTagLeak.test.ts`, 14 tests.

**The P0 hazard that fixing it nearly caused, and the reason the negative control
is the most important test in that file:** `[LESSON_COMPLETE]` is **not
residue** — `LessonScreen.tsx` parses it out of the response text to trigger the
completion transition, and route.ts's two `[LESSON_COMPLETE]` strips are
*fail-closed error paths only*. A generic SHOUTED-bracket sweep would have
**silently broken lesson completion for every subject**. It is excluded by name,
with a test proving it survives.

---

## 8. What certified acceptably

### Answer integrity (Part E) — the Phase-5 known unknown

The Phase-5 residual gap was: with no structured MCQ pending but an answerable
prior turn, correctness falls to model self-report, so a self-consistent-but-wrong
grading is unguarded. Driven to exactly that state live, with a deliberately wrong
free-response numeric answer ("I got 2.0 m/s east"):

| check | result |
|---|---|
| E-2 wrong answer did not increase mastery counters | **PASS** |
| E-3 wrong answer did not authorize completion | **PASS** |
| E-4 tutor did not affirm the wrong answer | tutor replied **"How did you arrive at the 2.0 m s⁻¹ east result?"** |

That last response is the pedagogically correct move for an unverifiable
free-response: it neither affirms nor rejects, it asks for reasoning. **The
specific 3 kg / 5 kg collision failure mode named in the brief did not
reproduce.** The limitation remains real and is restated as a known unknown in
§11 — the architecture cannot *verify* free-text correctness, and
`assetContract.ts` says so itself: *"correctness for free text has no
deterministic source."*

### Progression, mastery, remediation (Parts G, H)

Live-verified across physics, chemistry and English:

- wrong answers never advanced mastery counters — **PASS**
- 4 repeated acknowledgements never moved `checkCorrect`/`practiceCorrect`, even
  as the *delivery* phase legitimately advanced `OBSERVE→DEMONSTRATE→GUIDE` —
  **PASS** (the correct Case-B distinction)
- degraded-provider turns never created mastery — **PASS**
- excursions banked no parent-lesson mastery (`verified:false` throughout) — **PASS**
- knowledge gap → prerequisite detour → return worked end to end — **PASS**
- no infinite loop, no trap, in any run — **PASS**
- **all 1,925 closed-choice probes across all 640 concepts have exactly one
  correct choice** — 0 ungradeable probes — **PASS**

### Visual integrity (Part F)

- **0 phantom claims across 11 measurable turns** — no turn claimed a figure it
  did not carry. `visualContract.ts`'s NO-FIGURE block is working. **PASS**
- Figure *identity* failed — but as a symptom of the P0, not a visual defect.

### Long-horizon (Part I)

- explicit stop honoured, not answered with a question — **PASS**
- returning did **not** restore or manufacture verified mastery — **PASS**
- returning did not inflate counters; earned `check=1` persisted correctly into
  the next session — **PASS**
- decay / spaced-review over real elapsed time — **UNTESTED** (needs days of
  wall-clock; faking the clock is manufacturing DB state, rule 16)

---

## 9. Failure clustering (Part K)

Observed failures collapse to **four** causes, not four dozen:

```
observed failures
  ├─ every wrong figure, wrong subject taught, wrong excursion (all subjects)
  │     └─> ONE cause: discourse deixis in resolveRequestedConceptId   [P0]
  ├─ English never reaching the mastery bar from authored inventory
  │     └─> ONE cause: 2-probe seed template, never remediated          [P1, content]
  ├─ English concepts assigned dna/force_diagram/wave archetypes
  │     └─> ONE cause: keyword collision across subject vocabularies    [P2, latent]
  └─ [ASSESSMENT_RESULT …] in the chat bubble
        └─> ONE cause: sweep covers 2 of 3 markup SHAPES                [P3, FIXED]
```

Two test-calibration defects were found in **my own harnesses** and are recorded
rather than hidden — this repo's own history warns that its harnesses have been
wrong five times:

1. The structural harness initially omitted `SEED_EXPLANATIONS`/`SEED_PROBES`,
   under-reporting English coverage as 214/216 instead of 216/216. Fixed to read
   exactly the corpus `instrumentation.ts` writes.
2. `AC-2` reported chemistry as failing to accumulate mastery. It had not: the
   10-turn budget ended one turn before `correctAtCheck` could increment at CHECK
   phase. **TEST CALIBRATION DEFECT**, not a product defect.

---

## 10. Protected-set compliance

No protected layer was modified. Knowledge Graph, Educational Brain, Blueprints,
curriculum, teaching assets, visual assets, mastery thresholds, certification
criteria, provider config and DB schema are all untouched. The single production
change is `residualTagSweep.ts` (a text sweep touching no state, no arbitration,
no evidence). The English content shortfall is reported as **CONTENT DEFECT —
OWNER REQUIRED** rather than fixed, exactly as Part L requires.

All Phase 1–5 invariants remain intact; the full suite (9,127 tests) is green.

---

## 11. Known unknowns

| item | status | why |
|---|---|---|
| Production DB row state (ACTIVE assets) | **UNKNOWN** | Supabase MCP lists 0 projects this session. Never reported as PASS. |
| Free-text answer correctness verification | **KNOWN LIMITATION** | No deterministic source exists; `assetContract.ts` states this itself. Mitigated, not solved, by the 3-tier MCQ/answerable-turn/verification stack. |
| Decay & spaced review over real time | **UNTESTED** | Needs days of wall-clock. |
| Real-student pedagogical effectiveness | **UNTESTED** | See §12. |
| Behaviour coverage beyond the sampled paths | **PARTIAL** | 12 of the 16 Part-D paths exercised live; `CORRECTION`, `UNRELATED QUESTION`, `REPEATED FAILURE`, `INTENSIFIED DON'T KNOW` were covered offline in Phase 5's suites but not re-run live here. |

---

## 12. Real-student validation (Part J) — NOT PERFORMED

No real students were recruited, so **pedagogical effectiveness is UNTESTED**.
This is a hard separation the brief demands and the evidence supports:

> **ENGINE CORRECTNESS** — measured, and largely good.
> **PEDAGOGICAL EFFECTIVENESS** — unmeasured. A synthetic agent can simulate
> confusion; it cannot prove a human learned.

Recommended protocol when the P0 is closed: 6–8 learners across 3 profiles
(true beginner, returning adult, confident-but-miscalibrated), one 20-minute
lesson each in physics and English, observing comprehension, whether they know
what to do next, whether remediation helped, and whether they trust the tutor —
with think-aloud capture and no intervention.

---

## 13. Recommended order of work

1. **P0 — discourse deixis.** Dedicated session, per §4's minimum correction,
   with `phase6-discourse-surface.ts` as the acceptance test (target: 0
   cross-subject resolutions) and the L1 battery as the regression guard.
2. **P1 — English probes.** Owner decision: author one additional closed-choice
   probe per English concept to reach contract v1.
3. **P2 — archetype collisions.** Must be resolved *before*
   `ENABLE_AI_SCENE_GENERATION` is turned on, not after.
4. Re-run all five Phase 6 harnesses, then Part J.

---

## 14. Phase 6 closure bar

| criterion | status |
|---|---|
| certification harness is trustworthy | ✅ (2 self-defects found and recorded) |
| representative curriculum coverage demonstrated | ✅ 640/640 offline, sampled live |
| all critical learner behaviours exercised | ⚠️ 12/16 live, remainder offline |
| answer integrity assessed | ✅ |
| visual integrity assessed | ✅ |
| remediation assessed | ✅ |
| progression/mastery assessed | ✅ |
| long-horizon assessed where possible | ✅ (decay UNTESTED, documented) |
| real-student validation | ❌ **not performed** |
| failures clustered by root cause | ✅ 4 causes |
| **no P0 remains** | ❌ **1 P0 open** |
| no unexplained P1 remains | ✅ (P1 explained, owner-gated) |
| UNKNOWN items documented | ✅ |
| production changes have regression tests | ✅ |
| full suite / TypeScript / build pass | ✅ 9,127 / clean / clean |
| working tree clean, HEAD == origin/main | ✅ |
| QA accounts deleted, deletion verified | ✅ 4/4, `reloginBlocked: true` |

**Phase 6 is therefore NOT CLOSED.** Two criteria fail: one P0 remains open, and
real-student validation was not performed.

---

## 15. Final verdict

## 🟠 NOT READY — FIX REQUIRED

The evidence spine — the part Phases 1–5 built — is sound. Nothing in this
certification fabricated mastery, skipped a learning stage, lost learner state,
or trapped a learner, and every closed-choice probe in the entire 640-concept
curriculum is gradeable. That is a real result and it should not be
under-claimed.

But the certification's primary question includes *"without being taught false
information"*, and a chemistry learner typing "explain the main idea please" was
taught English reading comprehension, with a figure, in production. One
resolver-level defect, ~11% of ordinary discourse phrases, all subjects.

Close the P0, then re-certify. The system is close — but it is not ready.

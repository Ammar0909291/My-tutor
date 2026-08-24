# Phase 6 P1 — English Asset-Contract Shortfall: Investigation & Classification

**Verdict: P1 CONFIRMED CONTENT/ASSET DEFECT — OWNER REQUIRED.**

No production code was changed. The runtime was investigated and found **not**
defective. 214 of 216 English concepts are short by one authored probe; the
remaining 2 are correctly *without* written probes by design.

---

## 0. A scope correction, stated first because it changes what was investigated

The task brief describes this P1 in visual terms — visual eligibility, visual
asset lookup, visual identity, "visual coverage 0/216", oral-first visuals.
**That is the P2 surface, not this one.**

`src/lib/teaching/assetContract.ts` is the **mastery-gate assessment** contract:

> at least 1 explanation and **≥ 3 closed-choice PROBES** per concept

It contains no visual logic and is not imported by the visual layer. The
"2 vs 3" finding is **MCQ assessment probes**, not visual probes. This
investigation therefore traces the assessment path. The oral-first question is
still answered (§3), because it is genuinely load-bearing — just for probes
rather than pictures.

---

## 1. Reproduction (Step 1)

`scripts/qa/phase6-p1-english-probe-audit.ts`, reading the exact corpus
`src/instrumentation.ts` writes. Zero provider calls.

```
english KG concepts: 216      with any authored asset: 216
closed-choice probes per concept -> concepts:  { "0": 2, "2": 214 }
concepts BELOW contract: 216 / 216
```

**Affected concepts:**

| set | count | inventory |
|---|---|---|
| the template shortfall | **214** | `mcq ×1 + misconception_probe ×1` — *identical in all 214* |
| zero closed-choice | **2** | `eng.phonics.phonemic-awareness`, `eng.phonics.letter-sound-correspondence` — `short_answer ×1` each |

---

## 2. What the three probes represent, and why the bar cannot move

The bar is **derived from the protected mastery thresholds**, not chosen:

```
MIN_CLOSED_CHOICE_PROBES  = 3
MASTERY_CHECK_REQUIRED    = 1
MASTERY_PRACTICE_REQUIRED = 2      1 + 2 = 3   ✓ derived
```

Mastery needs three *server-graded correct answers*, and the gate never re-asks
a spent probe. So "3" is the mastery bar restated as inventory. **Lowering it to
2 would certify a concept that structurally cannot reach mastery** — which is
the forbidden "weaken the certification criteria" move. Pinned in
`src/tests/englishAssetContractP1.test.ts` §1.

---

## 3. Is the shortfall intentional? (Step 3) — measured, two different answers

### The 214: **NOT intentional.** English is not assessing differently — it is assessing *less*.

If English were deliberately oral-first for *assessment*, its probes would be
open-recall. Measured across the shipped corpus:

| subject | closed-choice | open-recall | verdict |
|---|---|---|---|
| **english** | **428** | **2** | 99.5% closed-choice |
| chemistry | 687 | 0 | 100% closed-choice — **and meets the bar on every concept** |
| physics | 811 | 541 | mixed |

English uses the **same closed-choice modality as chemistry**, which clears the
bar on all 186 of its concepts. And all 214 short concepts carry the *identical*
signature `mcq ×1 + misconception_probe ×1` — a generator template, not 214
independent pedagogical decisions.

### The 2: **INTENTIONAL, and must not be "fixed".**

`educational-brain/first-lesson/07-subject-adaptations.md` §1, verbatim:

> "**Voice is the WHOLE channel** — this is the tree's flagship voice-required
> territory: every success and every failure is audible and **nothing is
> writable**."

Authoring text MCQs for `eng.phonics.phonemic-awareness` would *contradict the
product's own authored design*. These two concepts hold a `short_answer` probe
instead, which the contract explicitly counts but never substitutes, because
free text has no deterministic answer key.

**The blanket contract mis-models these two.** Reported, **not** carved out: a
voice-required exemption needs an authoritative list of which concepts are
voice-required, and inventing one would encode curriculum knowledge into the
contract — protected territory.

### An inconsistency found in passing, reported not fixed

`eng.phonics.print-concepts` is the *other* declared pre-reading entry node
("Both entry nodes are pre-reading"), yet it carries the standard
`mcq ×1 + misconception_probe ×1`. A pre-reading learner cannot read MCQ
options. Meanwhile `letter-sound-correspondence` — which the same document
places *after* lesson one ("the letter is a later lesson") — has no closed-choice
probes. The corpus and the design disagree in both directions.
**CONTENT DEFECT — OWNER REQUIRED.**

---

## 4. The contract path, and why the RUNTIME is not defective (Step 2)

```
concept -> authored probe lookup (assembleLesson / gate, provider='gate')
        -> pool exhausted?
             -> model's <!--MCQ--> tag (gradeable, but ADVISORY)
             -> still nothing gradeable?
                  -> withholdUngradedGateQuestion strips the question
                  -> shouldSuppressSignalCorrectness refuses correctness
                  -> masteryVerifiedStrict stays false
                  -> gateLessonCompletion strips [LESSON_COMPLETE]
```

**Decisive fact: `assetContract.ts` is imported by ZERO production runtime
modules.** Its only importers are `scripts/math/state.ts` and the Phase-6
certification scripts. `gateAssessment.ts` and `mathematicsSeedAssets.ts`
reference it *in comments only*. It is an **authoring and certification
instrument**, not a runtime gate — so a below-contract concept cannot, by
construction, cause a runtime defect.

The product states this itself, in `gateAssessment.ts`:

> "It cannot manufacture the probe that was missing; only the asset contract can
> do that. **This is the backstop for a concept below contract, not the cure.**
> … a rising fire rate is the signal that **the corpus, not the runtime**, needs
> attention."

Verified against the real function (`englishAssetContractP1.test.ts` §4): an
ungradeable question at CHECK/PRACTICE is **withheld**, a genuinely gradeable
MCQ is **not** withheld (no over-blocking), and the guard does not fire outside
a mastery gate.

### One measured limitation, pinned not fixed

The withhold is **paragraph-scoped**:

| shape | outcome |
|---|---|
| teaching and question in **separate** paragraphs | teaching survives, question dropped |
| teaching and question in the **same** paragraph | both dropped → `"Let's stay with this idea for a moment."` |

Still honest — nothing fabricated, no ungradeable question served — but the
learner loses that sentence of teaching. It matters *for P1 specifically*
because a below-contract concept reaches this backstop far more often, so
English pays the cost at a higher rate. This is a known Phase-3 open item;
changing the scoping is a real behaviour change and is out of this task's scope.

---

## 5. Classification (Step 4)

| set | classification |
|---|---|
| 214 concepts | **CONTENT/ASSET DEFECT — OWNER REQUIRED** |
| 2 voice-required concepts | **INTENTIONAL / NOT A DEFECT** (contract mis-models them — reported) |
| `print-concepts` inconsistency | **CONTENT DEFECT — OWNER REQUIRED** |
| the runtime | **NOT A DEFECT** — proven, §4 |
| the contract bar | **CORRECT** — derived from protected mastery thresholds |
| the harness | **NOT defective for the 214**; over-reports the 2 |

**Recommended remedy (owner):** author **one** additional closed-choice probe
for each of the 214 concepts, matching the modality already in use. Do not
author written probes for the 2 voice-required concepts.

---

## 6. Live evidence (Step 8) — what the shortfall actually costs

`scripts/qa/phase6-p1-english-mastery-live.ts`, disposable account, deleted with
`{"deleted":true,"reloginBlocked":true}`.

| | authored (guaranteed) | model-volunteered | mastery counters | concept recorded |
|---|---|---|---|---|
| chemistry (control) | 1 | 2 | check 0, practice 0 | NEEDS REVIEW |
| english (under test) | 2 | 1 | check 1, practice 0 | NEEDS REVIEW |

n = 1 per subject. This sizes the **dependency** on model compliance; it is
**not** a compliance rate and must not be quoted as one.

### A near-miss worth recording: lesson closure is not mastery

Both lessons reported `lessonComplete.complete === true` at `practiceCorrect: 0`.
A harness reading only that field calls it **false mastery and reports a P0**.
It is not one. Traced through the real modules:

```
isConceptClosed        = hasDemonstratedMastery || budget exhausted
hasDemonstratedMastery = correctAtPractice >= 2 || phase === 'TRANSFER'
conceptOutcome().status = 'mastered'  <=>  hasDemonstratedMastery
```

At `practice = 0, phase = GUIDE` the status is **`needs_review`**, the concept
routes to `conceptsNeedingReview`, and `markConceptMastered` is **never called**.
The lesson *ends* on an exhausted concept budget and the concept is *queued for
review* — designed behaviour, not fabricated mastery. The label in the harness
was wrong; the runtime was right. Corrected in the script and pinned as tests
(§5 of `englishAssetContractP1.test.ts`) so it cannot recur.

---

## 7. Negative controls (Step 6)

| # | control | result |
|---|---|---|
| A | English oral-first concepts valid without visuals/probes | ✅ §3, pinned |
| B | English concepts that legitimately need probes handled | ✅ §4 backstop verified |
| C | Physics visual behaviour unchanged | ✅ no code changed |
| D | Chemistry visual behaviour unchanged | ✅ no code changed |
| E | **P0 discourse-deixis fix intact** | ✅ **90 cases, 0 false positives, 0 cross-subject** |
| F | no cross-subject resolution returns | ✅ 0/90 |
| G | no phantom visual claims | ✅ visual batteries green |
| H | no unrelated visual attachment | ✅ `visualOffCurriculumRequest`, `visualContinuity` green |
| I | no mastery/progression regression | ✅ `phase5CaseCharacterization` green; full suite green |
| J | Phase 1–5 invariants intact | ✅ 426 files / 9,159 passed |

---

## 8. Validation (Step 8)

| | |
|---|---|
| `npx tsc --noEmit` | clean |
| `npx vitest run` | **426 files, 9,159 passed, 9 skipped, 0 failed** |
| `npm run build` | clean |
| `phase6-discourse-surface` (P0) | **0 false positives / 0 cross-subject** |
| `phase6-structural-certification` | unchanged — 640/640 served, 424/640 at contract |
| L1 + excursion + visual + Phase-5 batteries | 167/167 |

Structural certification is **unchanged by design**: no content was authored, so
English is still short. That is the correct outcome for a CONTENT defect.

---

## 9. Files changed

| file | kind |
|---|---|
| `scripts/qa/phase6-p1-english-probe-audit.ts` | new — the audit |
| `scripts/qa/phase6-p1-english-mastery-live.ts` | new — live cost measurement |
| `src/tests/englishAssetContractP1.test.ts` | new — 18 tests pinning the classification |
| `docs/architecture/PHASE6_P1_ENGLISH_ASSET_CONTRACT.md` | new — this report |

**No production code changed. No protected content, KG, Brain, Blueprint,
curriculum, visual asset, mastery threshold, or progression logic touched.**

---

## 10. Not touched, as instructed

- **P2** — cross-domain visual archetype collisions. Untouched; not worsened
  (no visual code changed). Still latent until scene generation is enabled.
- **Real-student validation** — not started.
- **Phase 7** — not started.
- **P0 discourse fix** — verified intact only, not modified.

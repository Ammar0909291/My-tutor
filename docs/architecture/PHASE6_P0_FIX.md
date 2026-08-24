# Phase 6 P0 — Discourse Deixis Fix

Closure action for the single P0 raised by
[PHASE6_CERTIFICATION_REPORT.md](./PHASE6_CERTIFICATION_REPORT.md).

**Success criterion: 0 cross-subject discourse-deixis substitutions. Met — the
committed 90-case battery goes from 10 cross-subject to 0.**

---

## 1. The invariant

> When a learner is already being taught a concept, ordinary discourse referring
> to that teaching context must not silently resolve to an unrelated KG concept
> from another subject.

With the explicit counter-requirement that it must **not** block legitimate
topic changes: "teach me quadratic equations" must still resolve.

---

## 2. P0 reproduction (Step 1) — before any change

Reproduced at `e644e677`, against the real modules and live in production.

**Live** (`scripts/qa/phase6-visual-certification.ts`, disposable account): in a
**chemistry** lesson (`chem.found.pure-substances`), "explain the main idea
please" produced:

> "**Main Idea and Supporting Details** — The main idea is the core point or
> central claim that a text or passage is trying to convey…"

with `figure = "Identifying Main Idea and Supporting Details"` attached. The
chemistry lesson was abandoned and English reading comprehension taught in its
place. Identical in physics.

**Deterministic** (`scripts/qa/phase6-discourse-surface.ts`, 30 discourse
phrases × 3 lessons = 90 resolutions, all of which *should* be null):

| | before |
|---|---|
| false positives (non-null) | **15 / 90 (16.7%)** |
| **cross-subject** | **10 / 90 (11.1%)** |

```
phys.mech.newtons-first-law  "explain the main idea please" -> eng.reading.main-idea-and-details
chem.found.pure-substances   "what is the point of this?"   -> math.geom.point
```

---

## 3. Root cause (Step 2) — traced, not assumed

Both phrases reach KG-title matching and clear the 0.6 confidence floor:

```
"explain the main idea please" -> matchedText "Main Idea", TITLE_COMPONENT, 0.80
"what is the point of this?"   -> matchedText "Point",     EXACT_TITLE,     0.95
```

**Why the two existing "is this really a topic?" filters cannot catch them:**

- `isMediumUsage` handles only **single-word VISUAL medium nouns** ("graph",
  "chart"). "Main Idea" is two words; "Point" is not medium vocabulary.
- `isIncidentalWord` returns false **immediately** for any multi-word title
  ("multi-word titles are specific"), so it never inspects "Main Idea". It *does*
  inspect "Point" — and finds `"what"` inside its 3-token `REQUEST_CUE` window,
  concluding the noun is **governed**, i.e. a genuine topic.

That governance rule is correct for real topics ("what is a vector") and exactly
wrong for discourse nouns, because "what is the point of this?" uses the same
grammar to mean something entirely different. **Neither filter asks the one
question that separates them: is the matched text a SUBJECT, or the vocabulary
of talking about a lesson?**

### Why `DISCOURSE_NOUNS` was bypassed

It was not bypassed — it was never connected to this path. `DISCOURSE_NOUNS`
(`visual/requestedTopic.ts`) already contained **'idea'** and **'point'**, and it
is applied by `namedTopicUnknownTo` to the *unresolved-topic* path. It was never
applied to the *KG-title-matching* path. The two paths therefore disagreed about
what counts as naming a topic, and the P0 lived in the gap.

Proof the mechanism is sound where its vocabulary is complete: on the
unresolved-topic path, `"what is the point of this?"` already returned **null**
before any change — because `'point'` is in the list.

### Was `"main"` actually required? Yes — measured

The defect was reachable through **three** entry points fed by that one
disagreement:

1. `resolveRequestedConceptId`'s viable-match filter chain
2. `resolveNamedTopicHead`, its **fallback** — which runs precisely *when* (1)
   finds nothing, so fixing (1) alone merely moved the defect. Measured: after
   the filter was added, `"can you explain the main idea"` was the one surviving
   case, because its clause tokenizes to exactly `"main idea"`, which *is* the
   head of "Main Idea and Supporting Details".
3. `namedTopicUnknownTo` — which turned the same phrase into the topic
   **"main idea please"** and opened an unresolved-topic excursion, *pausing the
   lesson and freezing the mastery ladder*.

`'main'` is required for (1) and (3): `.every()` needs **every** word to be
discourse vocabulary, and `'main'` was absent.

---

## 4. Files changed

| file | change |
|---|---|
| `src/lib/teaching/visual/requestedTopic.ts` | export `DISCOURSE_NOUNS`; add `'main'`, `'please'/'thanks'/'thank'` |
| `src/lib/teaching/concept/requestedConcept.ts` | new `isDiscourseOnlyMatch`, applied in the viable-match chain **and** in `resolveNamedTopicHead` |
| `src/tests/discourseDeixisResolution.test.ts` | new, 18 tests |

**Vocabulary added on measured evidence only.** `'please'/'thanks'/'thank'` were
found *by the new test, not by inspection*: after `'main'` was added the phrase
still survived, because one non-discourse word is enough and `'please'` was that
word. Obvious siblings were **deliberately rejected** as real subject vocabulary
somewhere in the curriculum: `'basic'` (acid-base), `'general'` (general
relativity), `'simple'` (simple machines), `'core'`, `'central'`. `'key'` was
checked and is unnecessary — "what is the key idea?" already resolved to null.

---

## 5. Why the fix is safe

- **It reuses the existing mechanism.** One list, now shared by all three entry
  points, instead of two paths disagreeing. No new resolver, no new state
  machine, no transcript-specific guard, no phrase-specific regex.
- **It sits beside the two existing filters**, in the same chain, so all three
  "is this really a topic?" rules are read together.
- **The false-negative cost was measured before implementing, not after.**
  Across **all 1,775 KG concepts in all six subjects**, exactly **one** has a
  title made entirely of discourse vocabulary: `math.geom.point "Point"`. That
  is the entire cost, it is out of the implemented 640-concept scope, and it is
  pinned as a test so it cannot drift silently.
- **One real word is still enough**, so every compound survives: "point of
  view", "boiling point", "main sequence stars", "main group elements".

---

## 6. 90-case battery (Step 5)

| | before | after |
|---|---|---|
| false positives (non-null) | 15 / 90 (16.7%) | **0 / 90** |
| **cross-subject** | 10 / 90 (11.1%) | **0 / 90** |
| physics lesson | 5 fp, 5 cross | 0, 0 |
| chemistry lesson | 5 fp, 5 cross | 0, 0 |
| english lesson | 5 fp, 0 cross | 0, 0 |

Classification of the 90 after the fix: **90 correctly unresolved** (all are
deixis; null is the correct answer, and it leaves the lesson exactly where it
is), 0 false positives, 0 false negatives, 0 legitimate topic changes suppressed
— legitimate changes are covered separately in §7 because none of the 90 is one.

---

## 7. Negative controls (Step 6)

| # | control | result |
|---|---|---|
| A | explicit concept requests still resolve | ✅ `"what is entropy?"` → `phys.therm.entropy` |
| B | genuine cross-topic request still works | ✅ `"explain photosynthesis"` from a physics lesson → `bio.plant.photosynthesis` |
| C | existing KG-title matching intact | ✅ `"explain point of view"` → `eng.literature.point-of-view` |
| D | subject filtering / subject-local reading intact | ✅ `"explain hybridization"` → `chem.bond.hybridization` |
| E | prerequisite/topic requests still work | ✅ `namedTopicUnknownTo("teach me quadratic equations")` still opens |
| F | Phase 1–5 suite green | ✅ 425 files / 9,145 passed / 9 skipped |
| G | no visual-resolution regression | ✅ `visualOffCurriculumRequest`, `visualContinuity` green |
| H | no mastery/progression regression | ✅ full suite; `phase5CaseCharacterization` green |
| I | stop/remediation/acknowledgement unchanged | ✅ untouched; suites green |
| J | **L1 resolver battery green** | ✅ `qualifiedConceptResolution` + concept/excursion suites: **189/189** |

**Recorded rather than smoothed over:** `"explain boiling point"` now returns
null. This is an **improvement, not a regression** — the matcher never matched
the compound; it matched the bare fragment `[Point]` at 0.95, so *before* this
fix a chemistry learner asking about boiling point was sent to
**`math.geom.point`**, a geometry concept. Four of my own initial test
assumptions were wrong and were corrected against measured behaviour rather than
by relaxing the assertions.

---

## 8. Regression search (Step 8)

| consumer | reachable from | protected? |
|---|---|---|
| `resolveRequestedConceptId` ← `route.ts` (teaching/excursion) | live | ✅ by construction — fix is inside it |
| `resolveRequestedConceptId` ← `resolveVisualTarget.ts` (visual) | live | ✅ same function, same answer |
| `namedTopicUnknownTo` ← `route.ts` | live | ✅ via the vocabulary additions |
| `resolveConceptMatches` ← `understandConcepts` | **shadow only** | ⚠️ **not guarded — reported** |

**The invariant is enforced at the correct shared layer for every live path.**
`resolveRequestedConceptId`'s two live consumers share one answer by
construction, which is exactly the property that module's own docblock promises
("the figure can never depict a concept the teaching layer did not agree the
learner asked for").

**One dormant path is reported rather than patched.** `understandConcepts`
(`conceptUnderstandingEngine.ts`) calls the raw matcher directly and does **not**
have the guard. It is reachable only from `brainShadow`, which is logs-only,
gated on `BRAIN_RUNTIME_MODE` (**defaults OFF**), makes no LLM call, and whose
own header states "no value computed here is read by any production code path".
It therefore **cannot** produce this P0 today. It **would** reintroduce it if the
Brain runtime is ever promoted from shadow to serving, and must receive the same
guard before that happens.

---

## 9. Validation (Step 7)

| | |
|---|---|
| `npx tsc --noEmit` | clean |
| `npx vitest run` | **425 files, 9,145 passed, 9 skipped, 0 failed** |
| `npm run build` | clean |
| `phase6-discourse-surface` | **0 / 0** |
| `phase6-structural-certification` | unchanged (640/640 served; no resolver dependency) |
| L1 + excursion + visual batteries | 189/189 |

**One honest note on the suite.** An earlier full run reported 1 failure
(`blueprintSpineIsProse`, an `fs.readdirSync` test). It was caused by my own
`npm run build` running concurrently with the suite, passes in isolation, and
passes in a clean full run. Recorded rather than quietly re-run.

---

## 9b. LIVE VERIFICATION — the decisive evidence

Re-ran `scripts/qa/phase6-visual-certification.ts` (the harness that originally
reproduced the P0) against deployment **`dpl_DEVbxLA12fNxiuWKgdLam5FDbCvV`**
(commit `55cee14e`, state READY), disposable account, deleted afterwards with
`{"deleted":true,"reloginBlocked":true}`.

Identical scenario, identical phrase (`"explain the main idea please"`), all
three subjects:

| lesson | BEFORE (`e644e677`) | AFTER (`55cee14e`) |
|---|---|---|
| **physics** `phys.mech.newtons-first-law` | figure *"Identifying Main Idea and Supporting Details"*; taught reading comprehension | *"Newton's First Law says that an object will keep doing what it's already doing unless something outside it pushes or pulls on it."* — **physics**, plus a genuine force diagram (gravity / normal force arrows) |
| **chemistry** `chem.found.pure-substances` | *"**Main Idea and Supporting Details** — The main idea is the core point or central claim that a text or passage is trying to convey…"* — **English reading comprehension inside a chemistry lesson** | *"**Main idea of pure substances and mixtures** — Picture a clear glass of still water… a cup of coffee…"* — **chemistry** |
| **english** `eng.grammar.nouns` | reading-comprehension figure, taught the reading skill | *"**Main idea of this lesson: "Nouns"** — A noun is a word that gives a name to something…"* — **nouns** |

**The cross-subject substitution is gone in all three, and the foreign figure is
gone entirely.** Note the phrase "main idea" still appears in the replies — it is
ordinary English and the tutor uses it naturally *about the lesson in progress*,
which is exactly the intended outcome: the phrase is understood as deixis rather
than as a concept request.

Secondary observations from the same run, both correct:

- **Physics** received a genuinely concept-appropriate figure for Newton's First
  Law, where before it received an English reading flowchart.
- **Chemistry and English** received honest inline ASCII diagrams with
  `figure = NO-FIGURE`, and neither claimed an attached figure — the
  `visualContract` NO-FIGURE rules held (0 phantom claims).

---

## 10. Remaining Phase-6 issues — untouched, as instructed

- **P1** — English asset-contract shortfall (2 closed-choice probes per concept
  vs a contract of 3). CONTENT DEFECT — OWNER REQUIRED.
- **P2** — cross-domain visual archetype collisions (latent until
  `ENABLE_AI_SCENE_GENERATION` is enabled).
- **Real-student validation** — not performed; pedagogical effectiveness remains
  UNMEASURED.
- **Free-response answer verification** — known limitation, unchanged.

None of these was touched by this task.

# The Deterministic Physics Verifier — design brief (dimensional slice)

**Status:** DESIGN ONLY. No runtime code was written or changed. No schema, no migration, no
implementation. The tree carries exactly one new file: this document.

**Scope:** `docs/architecture/TUTOR_REMEDIATION_PLAN.md` "Item 4 — Four primitives", sub-item 3.
Existing audit: `docs/architecture/PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` §4.2.

**Date:** 2026-09-16. **Branch:** `main`. **Measured against:** `78fef2b`.

**Sequence:** Item 1 (Typed Turn Contract) and Item 2 (Learner-Move Interpreter) are shipped —
Item 2 through Batch 7, plus the `recoveryGuard` gap this session's predecessor reported and the
next session closed (`78fef2b`). This is Item 3, same discipline: Opus designs, a separate
session executes in verified batches, nothing is implemented from this pass directly.

---

## 0. Verdict

**PROCEED — but §4.2's stated first slice is not the first shippable thing, and three of its
load-bearing claims are stale or wrong.** Corrected below with evidence.

| §4.2 claim | Verdict |
|---|---|
| *"There is currently no physics correctness checking anywhere in `src/`"* | **FALSE as of `78fef2b`.** Two deterministic physics-correctness guards are live in **both** learner-facing routes: `fieldLineSignGuard.ts` (174 lines) and `visionDirectionGuard.ts` (164 lines). They are the working prototype of this very primitive (§1) |
| *"`mathjs` sits in `package.json` imported by zero files"* | **FALSE.** `mathjs` is copied to `public/vendor/dynamic-visuals/mathjs.js` by a `postinstall` script, ships as a **650 KB browser bundle**, and is injected into the sandboxed renderer's `new Function(…)` scope. It is unused **server-side**, which is the only part of the claim that survives (§1.2) |
| *"dimensional first — free, fully deterministic"* | **Deterministic yes; free no.** A sound dimensional check needs per-concept symbol bindings that **do not exist in any corpus** (§3), because every physics symbol probed is overloaded across concepts (§4.3) |
| Acceptance bar: *"zero false rejections across a 200-turn replay of real transcripts"* | **Currently unmeetable — the corpus does not exist.** `transcriptReplay.test.ts` carries 3 transcripts, none physics-numeric, and no `.jsonl` transcript store exists in the repo (§4.5) |

And the finding that most shapes this design:

> **All three physics-correctness defects this repository has ever recorded are invisible to
> dimensional analysis.** The friction invented key (`μ·mg·sin30` where `cos30` belongs) is
> **dimensionally identical** to the correct expression — both are `[M][L][T⁻²]`. The field-line
> sign inversion and the emission theory of vision are direction and mechanism claims carrying no
> equation at all. Dimensional analysis would have caught **0 of 3**. (§4.4)

So the honest shape is: **build it, ship it shadow-only, and do not promise it will catch the
errors this repo has actually seen.** It is insurance against a class of error that is *plausible*
and *cheap to exclude structurally*, not a fix for a measured defect. §7 steel-mans the case
against, and the steel man is strong.

**The one design rule that matters most, stated once:** K5 is off in production because a rule
rejected by default on a common shape. **This verifier ABSTAINS by default and rejects only on
positive proof.** Anything it cannot parse, bind, or frame as an assertion is a PASS. (§5.3)

---

## 1. The central question, answered with grep

### 1.1 Is there physics-correctness checking in `src/` today? **Yes — two guards.**

```
$ ls src/lib/teaching/*Guard*.ts
  … fieldLineSignGuard.ts      visionDirectionGuard.ts …

$ grep -nE "repairFieldLineSign|repairVisionDirection" src/app/api/learn/chat/route.ts
  7570:  const { repairFieldLineSign } = await import('@/lib/teaching/fieldLineSignGuard')
  7571:  const sign = repairFieldLineSign(cleanText, resolvedDecisionConceptId)
  7614:  const { repairVisionDirection } = await import('@/lib/teaching/visionDirectionGuard')
  7615:  const vision = repairVisionDirection(cleanText, resolvedDecisionConceptId)

$ grep -nE "repairFieldLineSign|repairVisionDirection" src/app/api/learn/lesson-init/route.ts
  583:   const { repairFieldLineSign } = await import('@/lib/teaching/fieldLineSignGuard')
  584:   const sign = repairFieldLineSign(routed.text, topicSlug)
  614:   const { repairVisionDirection } = await import('@/lib/teaching/visionDirectionGuard')
  615:   const vision = repairVisionDirection(routed.text, topicSlug)
```

Both check a **physical fact**, not text shape. `fieldLineSignGuard`'s own header:

> *"Field lines give the direction of E, which is the direction of the force on a POSITIVE
> charge… The learner's very first contact with the concept taught them its central
> misconception. MEASURED across 22 real lesson openings: 1 inversion, 17 correct, 3 that make no
> sign claim at all (~4.5%)."*

`visionDirectionGuard`'s: *"light travels INTO the eye, never out of it… MEASURED: 2 of 2
openings, different wording each time."*

**This changes the framing of the whole item.** The question is not "can we build a deterministic
physics guard in this codebase" — two are running. It is **"can the per-fact guard be
generalised into a per-equation one, and is that generalisation worth its authoring cost?"**

Their shared shape is the template §4 adopts:

```ts
export function isInvertedFieldLineClaim(sentence: string): boolean
export function repairFieldLineSign(text: string, conceptId: string | null): FieldSignRepair
```

— a **total predicate** over one sentence, plus a **repair** that rewrites the offending sentence
and returns `{ text, repaired[] }`. Concept-scoped, idempotent, no-op by default, wrapped in
`try { … } catch { /* non-fatal — a repair must never break a turn */ }`. **It never rejects a
turn.**

### 1.2 Is `mathjs` unused? **No — it is a shipped browser dependency.**

```
$ grep -n mathjs package.json
  46:    "mathjs": "^15.2.0",

$ grep -rn mathjs src/ scripts/
  src/components/learn/DynamicVisualRenderer.tsx:42:  '/vendor/dynamic-visuals/mathjs.js',
  src/components/learn/DynamicVisualRenderer.tsx:64:  var factory = new Function(…,'mathjs', …)
  src/lib/teaching/visuals/generateVisualizationCode.ts:127: Available libraries … mathjs
  scripts/copy-dynamic-visual-vendor.mjs:34: ['node_modules/mathjs/lib/browser/math.js','mathjs.js']

$ grep -n postinstall package.json
  26: "postinstall": "prisma generate && node scripts/copy-dynamic-visual-vendor.mjs"

$ ls -la public/vendor/dynamic-visuals/mathjs.js   →  649724 bytes
```

`DynamicVisualRenderer` is imported by `LessonScreen.tsx` — the live lesson UI — and
`.env.example:170` sets `ENABLE_DYNAMIC_VISUALIZATION=true`.

**Why this correction matters rather than being pedantry.** §4.2's argument was "the CAS is already
paid for". It is paid for *in the browser*, for LLM-authored visual code, inside a sandbox. Adding
a **server-side** `import … from 'mathjs'` to the chat hot path is a new cost on a different
runtime — cold-start parse of a large library on a serverless function that
`src/instrumentation.ts`'s own bootstrap already fights for milliseconds. The dimensional slice
designed here **needs no CAS at all** (§5), so this is a reason to keep it out, not a reason to
reach for it.

---

## 2. Inventory: every point a physical claim could be intercepted

### 2.1 The two routes that speak to a learner

| Route | Draft variable | Lines | Guards already running there |
|---|---|---|---|
| `POST /api/learn/chat` | `cleanText` (declared ~L6541, reassigned 40+ times, last ~L11000) | 12,168 | the full chain below |
| `POST /api/learn/lesson-init` | `routed.text` (rebuilt as `routed = { …routed, text }`) | 846 | figure/ASCII strip, **both physics guards** — but **no `vAffirm`, no `V-CHALLENGE`** |

**The asymmetry is load-bearing and is a finding in itself.** The opening turn — where *both*
recorded physics incidents were captured — runs the two physics guards but neither deterministic
safety floor. Any new physics check must be wired into **both** routes in the same batch, or it
inherits the gap the guards' own headers describe: *"a repair added to one endpoint does not reach
the other."*

### 2.2 What already runs post-model in `route.ts`, in order

| Order | Guard | What it checks | Kind |
|---|---|---|---|
| 1 | `stripIpaNotation`, `normalizeMathDelimiters`, `stripRawImageUrls` | rendering hygiene | rewrite |
| 2 | **`repairFieldLineSign`** (L7570) | a physics fact | **physics repair** |
| 3 | `stripDanglingLeadingOption` | a truncated MCQ option | strip |
| 4 | **`repairVisionDirection`** (L7614) | a physics fact | **physics repair** |
| 5 | `stripLeadingFalseConfirmation` | an unbacked verdict claim | strip |
| 6 | `confirmCorrectAnswer` / `stateCorrectionForWrongAnswer` / `applyDontKnowCeiling` | verdict delivery | inject |
| 7 | **`vAffirm`** (L7966-8135) | agreeing with a floated misconception | **REJECT → 1 regeneration → authored fallback** |
| 8 | **`vChallenge`** (L8237-8277) | defending a challenged claim | **REJECT → 1 regeneration → neutral template** |
| 9 | `stripUnbackedFigureReferences`, `stripUnbackedAsciiDiagram` | phantom figures | strip |
| 10 | `enforceQuestionDeliveryContract` | an announced-but-absent question | repair |

Only **7 and 8** can reject-and-regenerate. Both are **single rules invoked directly**, never the
composed gate — and `route.ts` says exactly why (§5.1).

### 2.3 The fallback-to-authored ladder already exists — and its failure modes are recorded

`vAffirm`'s fallback is the mechanism §4 reuses, and it was learned the hard way:

1. **Repair:** one regeneration carrying **the authored correction**, not a prohibition. The
   comment records why a bare ban failed: *"telling the model 'don't agree' leaves it with nothing
   to say instead."*
2. **Fail closed, but still teach:** if the retry still violates, build from **the curriculum's own
   words** — KG description first, blueprint spine second.
3. **A prose gate on the authored text** (`readsAsProse`), because the authored source is not
   reliably speakable. Measured, verbatim from the route:
   > *"Its best case is a real definition; its ordinary case is a mastery rubric … and its worst
   > case — measured on a real learner — was an unfenced `concept_id: … bloom: …
   > mastery_threshold: …` profile block read out verbatim. … 485 of 1,775 KG descriptions share
   > this semicolon-joined shape."*

**So "fall back to authored content" is not free.** Roughly 27% of KG descriptions are syllabus
outlines that fail the prose gate. Any new fallback must pass through `readsAsProse` or an
equivalent, and must have a terminal generic case.

### 2.4 Where a physical claim exists as a string, ranked by suitability

| Channel | Contains equations? | Suitable target? |
|---|---|---|
| `cleanText` / `routed.text` — model prose | **yes** | **YES — the only target** |
| `mcq` payload (`TutorMCQ.question`, `.options`) | yes | **NO** — authored, human-reviewed, and the gate renderer deliberately *does not restate the question in prose* (`gateAssessmentRenderer.ts:88`) |
| `visualSpec` / `sceneSpec` labels | numeric | NO — the visual critic owns these |
| The learner's own message | yes | **NO** — never verify the learner; that is grading, and `resolveMcqChoice` owns it |
| Authored explanation assets served via `provider: 'memory'` | yes | **NO** — correct by construction; verifying them would flag the corpus |

---

## 3. What dimensional checking requires as input — measured, not assumed

### 3.1 The corpus carries **zero** machine-readable unit or dimension metadata

Union of **every** per-node field across all six subject KGs (1,775 concepts):

```
aliases · bloom · children · cross_links · description · difficulty · estimated_hours
id · mastery_threshold · name · parent · references · related · requires · unlocks
```

**Fields matching `unit|dimension|formula|equation|quantity|symbol`: NONE.**

Physics Blueprints, `Component 0 — Concept Metadata`, across 238 files (139 have a parseable
fenced block; the other 99 use a different layout — itself worth knowing):

```
concept_id · name · domain · difficulty · bloom · prerequisites · mastery_threshold
estimated_hours · cross_links · session_cap · status · cpa_entry_stage · label · number
```

**Fields matching `unit|dimension|formula|equation|quantity`: NONE.**

Units exist only as **prose inside teaching actions**. `phys.mech.kinetic-energy`'s Blueprint,
`TA-2`:

> *"P08 (notation): Introduce KE = ½mv². Label: ½ = exact (from calculus derivation), **m in kg, v
> in m/s, KE in J**."*

Correct, complete, and unparseable as a contract: it is a free-text bullet inside a numbered
teaching action, in one of two Blueprint layouts, for one of 238 concepts.

**Conclusion: authoring must be extended first.** There is no "read the units from the corpus"
path. §5.2 designs that extension as a code-side registry — **not** a schema change, matching the
`visualKnowledgeRegistry.ts` precedent and this pass's explicit no-migration rule.

### 3.2 There is material to author *from*

Authored physics asset modules (`src/lib/teaching/assets/physics*.ts`, 7,604 lines):

```
physicsDepthSeedAssets.ts   6,482 lines   178 equation-shaped strings   572 number+unit pairs
physicsBandGapAssets.ts     1,122 lines    35 equation-shaped strings    90 number+unit pairs
TOTAL                                     213                           662
```

149 **distinct** equation-shaped strings. So the raw material for a binding registry exists and is
already curated — the authoring job is transcription plus disambiguation, not invention.

---

## 4. Measurements

All produced this session against `78fef2b`, offline, against real repository content.

### 4.1 A hand symbol table covers 66% of occurrences — and that is the optimistic number

Extracting `LHS = RHS` from authored physics prose: **51 distinct LHS symbols**, of which **22**
are in a generous 40-symbol hand table and **29 are not** — `Δl`, `ΔU`, `Δm`, `ΔL`, `Δt`, `Δv`,
`Q_H`, `T_H`, `Q_C`, `S`, `x`, `j`, `mg`, `Fd`…

**Coverage: 66% of occurrences.** The missing third is concentrated in thermodynamics and
oscillations — i.e. not a tail, a *domain*.

The same extraction also caught `src = (concept: string` and `min = 4 km in (1/30) h`. **The
equation extractor is itself a false-positive source** before any dimensional logic runs, which is
why §5.3 makes extraction inverted-default.

### 4.2 Real equations the parser must handle

```
v = u + at        a = F/m         p = mv          F = ma          E = mc²
s = ut + ½at²     T = 2π√(L/g)    v = √(T/μ)      B = μ₀nI        a = Δv/Δt
```

Radicals, subscripts, Unicode (`½`, `²`, `μ₀`, `π`, `Δ`), and mixed prose. A regex-per-equation
approach does not survive this; a small expression parser is required — **and that is still not a
CAS** (§5).

### 4.3 **Every physics symbol probed is overloaded.** This is the decisive technical finding

Meanings actually present *in the same authored corpus*:

| Symbol | Distinct meanings found | Consequence |
|---|---|---|
| `T` | period · tension · temperature (`T_H`) · `T = 2π√(L/g)` · `v = √(T/μ)` | **5 of 5 probed** |
| `μ` | permeability (`μ₀`) · coefficient of friction · linear mass density | **3 of 4 probed** |
| `E` | `E = mc²` · electric field · photon energy | **3 of 3** |
| `p` | momentum (`p = mv`) · pressure | **3 of 3** |
| `a` | acceleration (`a = F/m`) · amplitude | **3 of 3** |

`v = √(T/μ)` is **dimensionally correct** when `T` is tension `[MLT⁻²]` and `μ` is linear density
`[ML⁻¹]`. Under a global table where `T` is period `[T]` and `μ` is dimensionless friction, the
same string is **nonsense** — and a verifier would "repair" a correct equation into a wrong one.

**Therefore a global symbol→dimension table is unsound for this corpus.** Bindings must be
**per-concept**. That is the authoring cost §4.2 called "free", and it is the single largest input
to the steel man.

### 4.4 Dimensional analysis would have caught **0 of 3** recorded incidents

| # | Recorded incident | Source | Dimensional signature |
|---|---|---|---|
| 1 | Invented key: `μ·mg·sin30` keyed where `μ·mg·cos30` belongs (`phys.mech.friction`, 2026-09-01) | `inventedProbeGuard.ts:10-16`; `route.ts:6654` | **IDENTICAL** — both `[M][L][T⁻²]`. Invisible |
| 2 | Field lines described as the direction a **negative** test charge moves (`phys.em.electric-field`, 2026-09-06) | `fieldLineSignGuard.ts` | **No equation.** Invisible |
| 3 | "light that leaves your eyes hits the mirror" (`phys.opt.reflection`, 2026-09-07, 2 of 2) | `visionDirectionGuard.ts` | **No equation.** Invisible |

A `grep` of `docs/qa/PHYSICS_CHEMISTRY_REAL_STUDENT_DEFECTS.md` and the master backlog for
numeric/unit/formula error language returns **no physics-correctness defect at all** — every hit is
about probe depth, budgets, stalls and flow.

**This is not an argument that the errors do not happen.** It is an argument that this repository
has never instrumented for them, which is precisely what a shadow-only slice would fix. But it
must be said plainly: **the dimensional slice is not justified by any measured defect.**

### 4.5 The acceptance bar's corpus does not exist

§4.2 requires *"zero false rejections across a 200-turn replay of real transcripts."*
`src/tests/transcriptReplay.test.ts` carries **3** transcripts (visual-pipeline bypass, confusion
detection, wrong-visual selection) — none physics-numeric. No `.jsonl` or captured-run store
exists outside `node_modules`. The 200-turn corpus must be **manufactured**, and the batch plan
(§6) makes that Batch 1 rather than pretending it is available.

### 4.6 The false-positive class is authored pedagogy, not noise

Authored physics content deliberately contains wrong equations:

```
"A student writes v = at², where v is a velocity, a an acceleration and t a time.
 Is the equation dimensionally consistent?"                    ← an authored PROBE STEM
"τ = Iω is the ANGULAR MOMENTUM, not the rotational F = ma —
 the same slip as writing F = mv"                              ← an authored MISCONCEPTION label
```

And this is **first-class pedagogy**, not an accident:
`educational-brain/teaching-actions/04-test-thinking-family.md #17 — Error Analysis`:
> *"here is a wrong [worked example], find the flaw and name the misconception behind it"*

**A tutor stating a wrong equation on purpose is a correct teaching turn.** Any verifier that
cannot tell assertion from demonstration will suppress the Error Analysis action. §5.3's
assertion frame exists solely for this.

Mitigating structure, already true: probe stems reach the client through the `mcq` payload, and
`gateAssessmentRenderer` explicitly *"do[es] not restate the question"* in prose — so the worst
case (verifying an authored stem) is largely excluded by the channel split (§2.4), not by cleverness.

---

## 5. The design — dimensional slice only

Two new pure modules. Nothing existing is modified, re-derived or replaced.

* `src/lib/teaching/physics/dimensions.ts` — dimension algebra + expression parser. Pure, no I/O.
* `src/lib/teaching/physics/dimensionBindings.ts` — the authored per-concept symbol registry.

### 5.1 Why this is not K5, stated against K5's own recorded reason

`route.ts` L7955-7962, verbatim:

> *"Reusing `verifierGate` with a deliberately permissive context was tried first and abandoned on
> inspection: `maxQuestions` is typed `0 | 1`, and V-Q2 rejects any TEACH/SHOW/RECOVER/CLOSE draft
> that ends in a question — which is most good teaching turns. A 'permissive' context **is not
> actually reachable**, so that route would have regenerated ordinary turns for reasons unrelated
> to safety and charged a model call for each."*

The trap has two halves and this design refuses both:

| K5's failure | This design |
|---|---|
| **Composition** — 22 rules share a gate; one over-broad rule makes every context unreachable | **ONE rule, invoked directly**, exactly as `vAffirm` and `vChallenge` are. There is no gate, no rule array, no context object. A second physics rule gets its own call site or does not ship |
| **Reject-by-default on a common shape** — "ends in a question" is most teaching turns | **Abstain-by-default.** The rule returns `null` (pass) for everything except a fully-bound, fully-parsed, assertion-framed equation that is *provably* inconsistent. Unparseable, unbound, unframed → **PASS** |

### 5.2 The authored binding — a registry, not a schema change

```ts
/**
 * PER-CONCEPT SYMBOL BINDINGS.
 *
 * WHY PER-CONCEPT AND NOT GLOBAL: measured on this repo's own authored
 * physics corpus, every symbol probed is overloaded — T is period AND
 * tension AND temperature; μ is permeability AND friction AND linear mass
 * density. `v = √(T/μ)` is correct under one binding and nonsense under
 * another. A global table would "repair" correct equations.
 *
 * NOT A SCHEMA CHANGE. A code-side registry, the same shape
 * `visualKnowledgeRegistry.ts` already uses for concept-keyed authored data.
 * No Prisma model, no migration, no corpus file format change.
 */
export interface Dimension {           // exponents over the 7 SI base dimensions
  readonly M: number; readonly L: number; readonly T: number
  readonly I: number; readonly Θ: number; readonly N: number; readonly J: number
}

export interface ConceptDimensionBinding {
  readonly conceptId: string
  /** Symbol → dimension, valid ONLY within this concept. */
  readonly symbols: Readonly<Record<string, Dimension>>
  /**
   * The equations this concept is allowed to ASSERT, canonical form. Serves
   * two jobs: it bounds what the checker will look at, and it is the
   * authored text the repair falls back to — so the fallback is authored by
   * construction, exactly as vAffirm's is.
   */
  readonly canonical: ReadonlyArray<{ readonly text: string; readonly gloss: string }>
}
```

An unbound concept has **no entry**, and the checker is a total no-op there. Coverage grows one
concept at a time and never gates a lesson.

### 5.3 The three gates every equation must pass before it can be rejected

All three are **inverted-default** — the house rule this repo established in `engagesPendingOptions`
(ENG-D02) and restated in the Learner-Move Interpreter brief: *the default answer is NO.*

**Gate A — EXTRACTION.** Only an equation matching a conservative shape, in a sentence with no
code fence, no backticks, and no `:` immediately before it. (§4.1 found `src = (concept: string`
and `min = 4 km in (1/30) h` slipping through a naive extractor; both die here.)

**Gate B — BINDING.** *Every* symbol on both sides must appear in this concept's binding. One
unbound symbol ⇒ **abstain**. This is what makes §4.3's overloading safe: an unbound `T` is never
guessed.

**Gate C — ASSERTION FRAME.** The equation must be **asserted by the tutor**, not quoted,
questioned or demonstrated-as-wrong. Implemented as a **whitelist of assertion frames**, never a
blacklist of quotation markers:

```
ASSERTED      "the formula is X = …"  ·  "we write X = …"  ·  "X = … tells us"
              ·  "so X = …"  ·  a standalone display line
NOT ASSERTED  anything else — including every Error Analysis shape (§4.6),
              any sentence containing a question mark, any sentence inside
              quotation marks, and any sentence in which the equation is the
              object of a verb like "writes", "says", "thinks", "claims"
```

A blacklist here would be the exclusion-list trap this repo has documented twelve times over
(`DISCOURSE_NOUNS`). The whitelist's cost is recall — it will miss asserted equations in phrasings
nobody enumerated — and **that is the correct direction to be wrong** for a guard whose false
positive suppresses a legitimate teaching action.

### 5.4 The rule

```ts
/** A TOTAL function. Returns null (PASS) for everything it cannot prove wrong. */
export function dimensionalViolation(
  draft: string,
  binding: ConceptDimensionBinding | null,
): DimensionalViolation | null
```

`null` when: no binding · no extraction · any unbound symbol · no assertion frame · parse failure ·
**or the equation is dimensionally consistent.** Non-null **only** when a fully-bound,
assertion-framed equation has provably unequal dimensions on its two sides.

### 5.5 Failure mode: repair the sentence, never reject the turn

Following `fieldLineSignGuard`, not `vAffirm` — because a dimensional slip is a **local**
statement error, and `vAffirm`'s regenerate-then-fail-closed ladder costs a provider call and can
still end at a generic template.

1. **Replace the offending sentence** with the concept's own `canonical` entry + `gloss`. Authored
   by construction; no model call; no `readsAsProse` gate needed because the text was authored to
   be spoken (unlike KG descriptions, 27% of which fail that gate — §2.3).
2. **If the concept has no matching `canonical` entry** — possible, since the binding may cover
   symbols without covering that equation — **withhold the sentence** and keep the rest of the
   turn. Never substitute a hedge, an apology, or "let me rephrase".
3. **Never regenerate.** No provider call. This keeps Permanent Rule 9 untouched and keeps the
   check free at runtime.

Idempotent, so re-running it on repaired text is a no-op — the property both existing guards hold
and their tests pin.

### 5.6 Where it goes

Immediately **after** `repairVisionDirection` (`route.ts` ~L7630; `lesson-init` ~L630) and
**before** `vAffirm`. Reasons: it is the same family as the two guards above it; it must run before
`vAffirm` so a regeneration triggered there sees already-repaired text; and it must run *after* the
figure/notation rewrites so it reads the text the learner will actually see.

**Both routes, same batch.** §2.1's asymmetry is a standing defect; this must not add to it.

### 5.7 Explicitly out of scope for this pass

Named and scoped only, per instruction:

| Tier | Needs | Status |
|---|---|---|
| **Numeric / order-of-magnitude** | a per-equation tolerance field on the binding | future |
| **Sign convention** | a per-concept sign contract; `fieldLineSignGuard` is a hand-built instance | future |
| **Limiting cases** | authored limits per equation (`v→c`, `m→0`, `θ→0`) | future |
| **Symbolic / CAS** | `mathjs` **server-side** — a new runtime cost (§1.2), explicitly last | future |

---

## 6. Migration — seven batches, shadow-first

Same discipline as the Learner-Move Interpreter's table. **Honest constraint up front:** this app
has near-zero organic traffic (the Turn Contract brief's §9 and `TUTOR_REMEDIATION_PLAN` §9.2 both
record it; production runtime logs have shown zero requests in a 24h window). **Observation
windows must therefore be manufactured, and the batch plan says so rather than waiting for traffic
that will not arrive.**

| # | Batch | Content | Precondition | Risk |
|---|---|---|---|---|
| **0** | **Dimension algebra + parser, unconsumed** | `dimensions.ts`: the 7-exponent type, multiply/divide/power/equality, and the expression parser for §4.2's real shapes. Unit tests only. Zero route change. A purity test asserts no `mathjs` import, no I/O, no model import | — | **none** |
| **1** | **Manufacture the corpus** | The 200-turn replay the acceptance bar needs and the repo does not have: harvest the 149 distinct authored equations (correct controls) + a seeded set of dimensionally-broken variants (rejection cases) + the §4.6 Error Analysis shapes (**must-not-fire** controls). A fixture file, no runtime code | Batch 0 | **none** |
| **2** | **Bindings for ONE domain** | `dimensionBindings.ts` for `phys.mech.*` only — the domain with the least symbol overloading and the most authored equations. Every symbol hand-bound; every `canonical` entry copied from existing authored text, never written fresh | Batch 1 | **none** — data only |
| **3** | **Shadow in both routes** | Compute `dimensionalViolation` in `chat` and `lesson-init`; emit one `PHYSICS_DIM={…}` line per turn (the `TURN_EVENT`/`CONTRACT_ASSERT`/`LEARNER_MOVE` convention). **Consume nothing. Repair nothing.** No DB write — the 2026-08-31 egress incident is the standing reason | Batch 2; **100% rejection + 0 false positives on Batch 1's corpus** | **none**: nothing reads it |
| **4** | **Manufactured observation window** | Drive N real physics lessons end-to-end against the deployed app on a disposable QA account, `phys.mech.*` only, and read the shadow lines. **This is the batch that decides whether Item 3 continues** — if the rule never fires on real generated prose, say so and stop | Batch 3 deployed | **none** — read-only |
| **5** | **Enforce: repair, `phys.mech.*` only** | Wire the sentence repair (§5.5). Concept-scoped to bound concepts; every other lesson is byte-identical | Batch 4 shows a non-zero fire rate **and** zero false positives | **medium** — first learner-visible change |
| **6** | **Widen bindings one domain at a time** | `phys.em.*`, then `phys.therm.*` (worst overloading — §4.1's missing third), etc. **One domain per commit**, each re-running Batch 1's corpus | Batch 5 quiet for one window | **low per domain** |

If the programme stops after Batch 4, the repository is strictly better off: it has the first
physics-correctness instrument it has ever had, a reusable corpus, and a measured answer to
"does this actually happen" — with **zero** behaviour change. That is a defensible resting state,
and given §7 it may well be the right one.

---

## 7. The steel man — and it is strong

Matching `TUTOR_REMEDIATION_PLAN.md` §9-11's discipline. I am not going to talk myself out of it.

**7.1 It catches none of the errors this repo has actually seen.** §4.4: 0 of 3. The one numeric
incident is a `sin`/`cos` swap, dimensionally identical. The other two carry no equation. **The
strongest argument against, and it is close to decisive on its own.**

**7.2 The recorded physics defect backlog contains no correctness defects at all.** Every entry in
`PHYSICS_CHEMISTRY_REAL_STUDENT_DEFECTS.md` is pedagogy and flow. Item 3 would be the first
primitive in this sequence built with **no measured defect behind it** — unlike Item 1 (116
untyped locals, D1-D5 measured) and Item 2 (9/9 cross-layer drift, measured).

**7.3 The authoring cost is the real cost, and §4.2 priced it at zero.** Per-concept bindings for
up to 238 physics concepts, each needing symbols hand-disambiguated because every probed symbol is
overloaded (§4.3). That is Curriculum-Production-Pipeline-shaped work, and this repository's own
history says such campaigns run to dozens of sessions.

**7.4 The acceptance bar cannot be met with existing material** (§4.5) — the 200-turn corpus must
be built first, which is Batch 1 of a 7-batch plan for a capability with no measured defect.

**7.5 Two hand-built guards may be the right answer permanently.** `fieldLineSignGuard` and
`visionDirectionGuard` are ~170 lines each, cost one afternoon, catch a *measured* defect exactly,
and have no authoring tail. If physics errors cluster around a handful of famous misconceptions —
which is what physics-education research says, and what 2 of 3 incidents here look like — **the
per-fact guard may strictly dominate the general verifier.** A third and fourth hand guard would be
cheaper than Batch 2 alone.

**7.6 The false-positive risk lands on the best teaching.** The Error Analysis action (§4.6)
deliberately states wrong equations. A verifier that suppresses it makes the tutor *worse* at
precisely the move that helps advanced learners most. Gate C reduces this; it cannot eliminate it.

**7.7 Near-zero traffic means "proven safe" is unavailable.** Batch 4's window is manufactured, so
"zero false positives observed" means "zero across the runs I drove", not across a population —
the same honest limit the Turn Contract's A6 and the Interpreter's 56%/21% figures carry.

### What survives the steel man

1. **Batches 0-4 are cheap and unfalsifiable-in-a-good-way.** They cost no behaviour change and
   answer, for the first time, whether generated physics prose *does* carry dimensional errors.
   §7.1-7.2 say we do not know — and not knowing is itself the finding worth fixing.
2. **The channel split already does most of the safety work.** Authored probes never reach
   `cleanText` (§2.4), so the worst false-positive class is excluded structurally, not by cleverness.
3. **Abstain-by-default makes the downside bounded.** Worst case, the rule never fires and is
   deleted. It cannot make a turn worse the way V-Q2 did, because it cannot reject anything it has
   not fully bound and parsed.
4. **§7.5 is an argument about ordering, not about the capability.** Even if per-fact guards
   dominate today, the binding registry is what makes the fifth, tenth and twentieth guard cheap.

**Recommendation, stated plainly:** approve Batches 0-4 as an *instrumentation* programme, and
treat Batch 5 (enforcement) as a **separate decision gated on Batch 4's measured fire rate**. If
Batch 4 shows the rule never fires on real generated prose, the correct outcome is to stop, keep
the corpus, and write two more hand guards instead. **That is a real possible outcome of this plan
and the plan should not be run by anyone unwilling to accept it.**

---

## 8. Definition of done — dimensional slice only

**Batch 0-3 (instrument), all of which must hold:**

1. `dimensions.ts` is pure: no `mathjs`, no I/O, no model import, no DB — asserted structurally by
   a purity test, the `turnProgress.test.ts` C1-C4 precedent.
2. `dimensionalViolation` is **total**: for every input it returns a value; it never throws; and a
   property test over random strings produces **zero** non-null results without a binding.
3. On Batch 1's corpus: **100% of seeded dimensionally-broken assertions rejected**, and **zero**
   false positives across (a) all 149 authored equations, (b) every §4.6 Error Analysis shape,
   (c) 200 turns of manufactured replay.
4. Shadow lines emit from **both** routes. No DB write.
5. Full suite green; `npx tsc --noEmit` clean; `npm run build` clean.

**Batch 5 (enforce) additionally:**

6. Repair is **idempotent** — re-running on repaired text is a no-op, pinned by test.
7. Repair is **concept-scoped**: a lesson with no binding is byte-identical, pinned by test.
8. On repair, the replacement text is **an authored `canonical` entry**, never generated, never a
   hedge, never an apology — pinned by test.
9. **Zero provider calls added.** Pinned by the existing `routeAI` call-site-count tests.
10. Live-verified on the deployed app: one `phys.mech.*` lesson driven end to end showing the
    repair firing, and one showing an unbound concept untouched.

**Explicitly NOT in this definition:** numeric tolerance, sign convention, limiting cases,
symbolic/CAS. Named in §5.7, designed nowhere.

---

## 9. Non-goals

1. **Deletes or weakens nothing.** `fieldLineSignGuard` and `visionDirectionGuard` keep their call
   sites unchanged; this layers beside them.
2. **Adds no composed verifier and re-enables no flag.** `ENABLE_OUTPUT_VERIFIER` /
   `ENABLE_EOS_RUNTIME` stay unset; K5 stays off; `vAffirm` and `vChallenge` are untouched.
3. **Adds no provider call.** Permanent Rule 9 preserved; the repair is deterministic substitution.
4. **Adds no server-side `mathjs`.** The dimensional slice needs no CAS (§1.2, §5.7).
5. **No DB migration, table, column, or snapshot key.** Bindings are a code-side registry.
6. **Touches no curriculum, KG, Blueprint or Educational Brain file.** The binding registry is
   *derived from* authored content; it does not edit it.
7. **Does not verify the learner's words, authored assets, probe stems, or visual specs** (§2.4).
8. **Does not touch the Turn Contract, Learner-Move Interpreter, `turnArbitration`, grading, or
   mastery certification.** `masteryCounterInvariant.test.ts`'s 49,152-state proof must pass
   unmodified after every batch.
9. **Does not fix §2.1's route asymmetry** (`lesson-init` lacking `vAffirm`/`vChallenge`). Reported
   in §11; it is a separate change with its own evidence.

---

## 10. Risks

| Risk | Why real | Mitigation |
|---|---|---|
| Suppressing Error Analysis (§4.6) | Authored pedagogy deliberately states wrong equations | Gate C is a whitelist, not a blacklist; Batch 1's corpus makes these explicit **must-not-fire** controls |
| A wrong binding "repairs" a correct equation into a wrong one | §4.3: `v = √(T/μ)` flips meaning under the wrong binding | Bindings are hand-authored per concept from existing authored text; Batch 2 is data-only and reviewable in isolation; `canonical` is copied, never written fresh |
| Gate C's whitelist misses real assertions | Inverted-default costs recall by construction | Accepted and stated. For a guard whose false positive degrades good teaching, low recall is the correct direction |
| The rule never fires, and the programme continues anyway | Sunk cost after 5 batches | Batch 5 is a **separate approval** gated on Batch 4's measured rate. §7's recommendation names stopping as a legitimate outcome |
| It becomes a composed verifier | Every future physics fact will want to join | One rule, one call site, no gate. A second rule gets its own site or does not ship — asserted in the module header, the `turnProgress` precedent |
| Manufactured windows overstate safety | Near-zero organic traffic | Stated up front (§6); "zero false positives" is always reported as "across the runs driven", never as a population claim |

---

## 11. What was verified, and what was not

**Verified** — against `78fef2b`, all re-runnable:

* `mathjs` in `package.json:46`; vendored by `postinstall`; 649,724-byte browser bundle;
  referenced by `DynamicVisualRenderer.tsx` (imported by `LessonScreen.tsx`) and
  `generateVisualizationCode.ts`; `.env.example:170` sets the flag `true`. **Zero server-side
  imports.**
* Both physics guards exist and are wired in both routes at the line numbers cited (§1.1).
* KG per-node field union across all 6 subjects — **no** unit/dimension/formula field.
* Blueprint `Component 0` keys across 238 physics files (139 parseable) — **no** unit/dimension
  field. Units appear only as prose inside teaching actions.
* 213 equation-shaped strings / 662 number+unit pairs in authored physics assets; 149 distinct
  equations; 51 distinct LHS symbols, 29 outside a 40-symbol table, 66% occurrence coverage.
* Symbol overloading: `T`, `μ`, `E`, `p`, `a` all multiply-bound in the same corpus.
* The friction incident's arithmetic at `inventedProbeGuard.ts:10-16` and `route.ts:6654-6656` —
  `sin30` vs `cos30`, dimensionally identical.
* `transcriptReplay.test.ts` carries 3 transcripts, none physics-numeric; no transcript store in
  the repo.
* Error Analysis as teaching action #17, `educational-brain/teaching-actions/04-test-thinking-family.md:64`.
* K5's disable rationale quoted verbatim from `route.ts` L7955-7962; `vAffirm`'s authored-fallback
  ladder and its `readsAsProse` gate, including the "485 of 1,775 KG descriptions" figure.
* `lesson-init` runs both physics guards and **neither** `vAffirm` nor `vChallenge`.

**NOT verified, and not claimed:**

* **No production traffic was inspected**; no live session was driven; `DATABASE_URL` is unset in
  this sandbox, so no DB state (including asset-contract coverage) was read. CLAUDE.md's
  "physics 261/261 pairs at contract" is **cited, not re-verified** — Batch 5's fallback depends on
  it, and the executor must confirm it before enforcing.
* **No code was written, compiled or run.** The suite and `tsc` were not run, because no source
  file changed. Baselines must be established before Batch 0.
* **The 66% symbol-coverage figure is over authored ASSET prose**, not over generated tutor prose,
  which is the verifier's actual input. No corpus of generated physics prose exists to measure
  (§4.5) — that is Batch 1's job, and the figure may move.
* **"Dimensional analysis catches 0 of 3" is a statement about the 3 recorded incidents**, not a
  prediction of its catch rate on unrecorded ones. The honest position is that the rate is
  **unknown**, and Batch 4 exists to measure it.
* My equation extractor is a throwaway measurement instrument, not the proposed Gate A. Its own
  false positives (`src = (concept: string`) are reported in §4.1 as evidence for why Gate A must
  be inverted-default, not as a defect in the design.

---

## 12. Open findings, reported not fixed

1. **`lesson-init` runs no deterministic safety floor.** It carries both physics guards but neither
   `vAffirm` nor `vChallenge`, on the turn where 2 of 3 recorded physics incidents were captured.
   Its own guards' headers name this class of gap: *"a repair added to one endpoint does not reach
   the other."* Separate change, separate evidence.
2. **99 of 238 physics Blueprints have no parseable `Component 0` fence.** Two layouts coexist. Any
   future tooling that reads Blueprint metadata will silently cover 58% of physics.
3. **27% of KG descriptions (485/1,775) fail `readsAsProse`.** Already known to `vAffirm`; recorded
   here because every "fall back to authored content" design inherits it.
4. **The physics defect backlog contains no correctness defects.** Either physics correctness is
   genuinely not failing, or nothing has ever looked. Batches 0-4 exist to tell these apart, and
   §7.2 treats it as an argument *against* until they do.

---

## 13. Relationship to existing documents, and governance

* `PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` §4.2 — this is that proposal with three claims
  corrected (§0), its cost re-estimated (§4.3), its acceptance bar shown unmeetable with current
  material (§4.5), and its ordering kept: dimensional first, symbolic last.
* `LEARNER_MOVE_INTERPRETER_DESIGN.md` — structure and rigor conventions mirrored; its house rules
  reused (inverted-default classification, shadow-first batches, abstain over guess).
* `TYPED_TURN_CONTRACT_DESIGN.md` — the shadow-log convention (`CONTRACT_ASSERT` → `PHYSICS_DIM`)
  and the no-DB-write rule are taken from it unchanged.
* `EDUCATIONAL_BRAIN_BIBLE.md` — **not reopened.** Permanent Rule 9 is preserved, not amended: the
  design adds zero provider calls.
* `TUTOR_REMEDIATION_PLAN.md` §2.0 still lists **"DEFERRED: the four primitives (Item 4) — not
  scheduled."** Items 1 and 2 were executed anyway, by owner decision, one at a time.
  **This brief is not an authorization.** Batch 0 needs the same separate decision under the
  standing G1/G2 rule in `CLAUDE.md` — and §7 argues that decision is genuinely closer than it was
  for Items 1 and 2, because this is the first of the four with no measured defect behind it.

---

## 14. Definition of done for the design

- [x] Central question answered with grep output, not assertion — and the source doc's claim
      **refuted**: two physics guards are live
- [x] `mathjs` claim re-verified and **corrected** — shipped browser bundle, unused server-side
- [x] Full interception inventory: both routes, all ten post-model guards, the channel split, and
      the authored-fallback ladder with its recorded failure modes
- [x] Corpus measured directly for unit/dimension metadata: **none**, in KG or Blueprints; the
      authoring extension is priced, not assumed
- [x] Interception point, failure mode, and composition with `vAffirm`/`vChallenge` designed
      against K5's own recorded reason for being off
- [x] Seven shadow-first batches, each with content, precondition and risk tag, and an honest
      statement that observation windows must be manufactured
- [x] Definition of done for the dimensional slice only; the other three tiers named and scoped,
      not designed
- [x] Steel man written at full strength, its strongest argument (0 of 3) conceded, and a
      recommendation that names stopping as a legitimate outcome

**Not done, by design:** no `dimensions.ts`, no bindings, no corpus, no route change, and no
numeric/sign/limiting-case/symbolic design. Those are Batches 0-2 and future work respectively.

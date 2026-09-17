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

### 6.1 Batch 4 — first read of the shadow, partial, 2026-09-16

Read production runtime logs (Vercel MCP, `environment=production`, query `PHYSICS_DIM`) rather
than assuming. **This is NOT the deliberate N-lesson campaign Batch 4 calls for** — no dedicated
QA account was driven for this purpose this session. It is the incidental residue of the
resolver/excursion live-verification session that produced `545819a`/`624b469`: 7 real sessions,
`phys.mech.newtons-second-law` / `phys.mech.free-body-diagram` (bound) plus
`phys.mech.hamiltons-equations` / `math.alg.equation` (unbound, off-domain). **14 `PHYSICS_DIM`
lines total — the full window the log query returned, so this is Vercel's retained history for
this query, not a sampled slice.**

Result: **`violationFound:true` — 0 of 14.** Gate distribution: `no-binding` 4 (concept outside
`phys.mech.*`'s bound set, exactly as designed), `no-extraction` 5, `no-assertion-frame` 5. **Zero
lines reached `parse-failure`, `unbound-symbol`, or `consistent`** — meaning the dimension-checking
core (the part Batch 0-2 actually built) has not yet been exercised by a single real turn; every
observed turn fell through the two pre-checks (no equation-shaped text extracted at all, or
extracted text not phrased as an assertion) before reaching it.

This is consistent with, but does not confirm or refute, §7.7's "near-zero traffic means proven
safe is unavailable" — the sample is real production data and genuinely shows zero fire, but it
was not generated by turns designed to elicit an equation assertion, so a "the rule never fires on
real generated prose" verdict cannot yet be drawn from it. **The deliberate observation window —
a disposable QA account driven through `phys.mech.*` lessons with turns that explicitly invite an
equation (`"what's the formula for..."`, `"can you show me F=ma"`, worked-example requests) — has
not been run.** Recorded here so the next session does not re-derive this from scratch, and does
not mistake this incidental sample for that campaign.

If the programme stops after Batch 4, the repository is strictly better off: it has the first
physics-correctness instrument it has ever had, a reusable corpus, and a measured answer to
"does this actually happen" — with **zero** behaviour change. That is a defensible resting state,
and given §7 it may well be the right one.

### 6.2 Batch 4 — the deliberate observation window, run for real, 2026-09-16

§6.1's gap closed: this is the campaign it named as not yet run. A disposable QA account
(`qa-physverif-b4-*@mytutor-qa.invalid`, created, driven, deleted, re-login confirmed blocked
afterward — `scripts/qa/physicsDimBatch4Drive.ts`) was driven through **4** `phys.mech.*` lessons
against the deployed app (`my-tutor-flame.vercel.app`), all four already in `dimensionBindings.ts`:
`newtons-second-law`, `free-body-diagram`, `momentum`, `kinetic-energy`. Each lesson opened via
`lesson-init` and then received **8** chat turns, every one phrased to explicitly invite an equation
("what's the formula for net force?", "can you show me F=ma written out?", "walk me through a
worked example with numbers", "what's the equation for momentum here?", "can you write the formula
as an equation for me", "show me the equation, not just words", "ok so what does the formula
actually look like", "what's the equation that connects these quantities?") — never a phrasing the
model would answer with a question of its own, which Gate C's own question-mark override would
exclude from assertion regardless.

**36 `PHYSICS_DIM` lines**, read from Vercel production runtime logs and isolated to this run's
session id (`cmu40us9v0001js04o7u7m52y`) — 4 `lesson-init` + 32 `chat`, exactly matching 4 lessons ×
(1 init + 8 chats). Every line accounted for; none dropped or unexplained.

**Gate distribution**: `no-binding` 12, `no-extraction` 14, `no-assertion-frame` 10,
`parse-failure` 0, `unbound-symbol` 0, `consistent` 0, `violation` 0.

**`violationFound:true` — 0 of 36.** With zero violations there is nothing to manually read for
true/false positives — the question "does it fire correctly" cannot even be asked yet, because it
never fires. **Zero lines reached `parse-failure`, `unbound-symbol`, or `consistent` either** — the
dimension-checking core built in Batch 0-2 was still not exercised, this time despite every turn
being deliberately equation-eliciting. This is the sharper finding §6.1 could not yet make: the
prior sample's caveat was "we didn't try eliciting an equation, so we can't conclude the rule never
fires on generated prose." This run tried, on 32 turns purpose-built for it, and the core still
never ran.

**Why, read from the actual served transcripts (not conjectured):**

- **The `no-binding` third (12/36) is a genuine finding of its own, not noise.** It is not spread
  across all four lessons — it is one recurring off-domain excursion: turns containing the word
  "equation" repeatedly resolved `resolvedDecisionConceptId` to **`math.alg.equation`** (unbound by
  construction — Batch 2 only bound `phys.mech.*`) rather than the lesson's own bound concept, even
  mid-lesson, on turns like "show me the equation, not just words" and "what's the equation that
  connects these quantities?". This is the same class of resolver/excursion behaviour
  `545819a`/`624b469` (cited in §6.1) already touched for `math.alg.equation`'s sibling
  `phys.mech.hamiltons-equations` — a live product interaction, not a verifier defect, and out of
  this batch's scope to fix. It does mean roughly a third of a deliberately physics-domain campaign
  never reached Gate B at all.
- **`no-extraction` (14/36) is dominated by one phrasing pattern.** The model overwhelmingly writes
  a formula either (a) immediately after a colon — "...acceleration: F = ma.", "In symbols: **ΣF =
  m × a**" — which Gate A's own "no ':' immediately before it" rule excludes by design (the same
  rule that keeps "Mirror: 1/v = ..." from firing), or (b) inside LaTeX display markup —
  `\[ \sum \vec{F} = m\,\vec{a} \]`, `\(p = m\,v\)` — whose backslash-prefixed symbols
  (`\vec{F}`, `\sum`) never satisfy `isPlausibleSymbol`'s letter-led shape, so Gate A's regex simply
  does not extract them as candidates.
- **`no-assertion-frame` (10/36) is the LaTeX equations and inline equations that DO extract, but
  are not phrased as a standalone display line and don't use one of Gate C's three whitelisted
  frames** ("so X = Y", "we write X = Y", "X = Y tells us") — e.g. "p = m × v" appearing mid-sentence
  immediately followed by a comma-separated explanatory clause, or an equation sentence that runs on
  into a following question with no separating punctuation (pulling the whole run into one sentence
  the question-mark override then excludes).

**Verdict, stated plainly rather than padded: the rule still does not fire, and this time it is not
because the observation window was incidental.** The model reliably writes correct physics
equations when asked (F = ma, p = mv, KE = ½mv² all appeared, unprompted content errors: none
observed) — but it almost never writes them in the specific shape (colon-free, non-LaTeX,
whitelisted-frame or standalone-line) Gate A+C were deliberately built conservative enough to
require. That conservatism was a deliberate design choice (§5.3: "abstain-by-default... a WHITELIST,
never a blacklist," citing the `DISCOURSE_NOUNS` exclusion-list trap directly) to keep the
false-positive risk in §7.6 near zero — and it is working exactly as designed, at the cost of also
suppressing nearly every true positive this run could have produced.

**This changes the calculus for §6 row 5, not just extends §6.1's caveat.** Batch 5's own
precondition is "Batch 4 shows a non-zero fire rate **and** zero false positives." Fire rate is 0/36
across a campaign built specifically to elicit fire. Per this batch's own stop condition ("if the
rule never fires on deliberately-elicited equation turns, say so plainly rather than padding the
report"): **it does not fire, and Batch 5 (enforcement) is not warranted on this evidence.** Two
honest paths forward, neither taken this batch: loosen Gate A/C's conservatism specifically to admit
colon-prefixed and LaTeX-bracketed equations (raises §7.6's false-positive risk, needs its own
corpus re-validation against Batch 1's MUST_NOT_FIRE_CONTROLS) — or accept §7's steel man as
decisive and retire the shadow as a permanently-dormant-but-cheap instrument, per §6.1's own "that
is a defensible resting state" line. Both remain open findings, reported not resolved.

Full transcripts (36 turns across 4 lessons, provider mix `groq`/`memory`, zero errors, zero
content-free holds observed) and the raw `PHYSICS_DIM` JSON lines were captured to this session's
scratchpad and are not committed (matching every prior QA-run convention in this repo — transcripts
are evidence for the turn that produced them, not durable repository content).

### 6.3 Batch 6 — Gate A/C widened to admit LaTeX and colon-marker equations, 2026-09-16

Owner decision, following §6.2's own two-path fork: loosen the gates and re-validate. Implemented
in `src/lib/teaching/physics/dimensionalVerifier.ts`, shadow-only, zero route/behaviour change —
this only widens what the shadow log counts, never what a turn does.

**Two additive whitelists, matching exactly the two named causes in §6.2, nothing broader:**

1. **LaTeX normalization** (`normalizeLatex`). `\vec{F}`/`\hat{n}`/etc. decorators unwrap to their
   bare argument; `\sum`/`\Delta`/Greek-letter commands map to the same Unicode letters
   `isPlausibleSymbol` already accepts unescaped; `\,`/`\;` (tight, multiplicand spacing) collapse
   to nothing, `\quad`/`\qquad` (wide, word-level spacing) collapse to one space. **Span-aware, not
   a flat find/replace**: whitespace is only collapsed to nothing INSIDE a recognized `\( \)`/
   `\[ \]` span (LaTeX math mode is whitespace-insignificant — "m a" and "ma" render identically),
   never outside one, where a space is still a real prose word-gap. This was found necessary, not
   assumed: the real captured Gemini transcript this batch validates against writes `\( F = m a
   \)` with a plain decorative space (not a `\,` command) between "m" and "a", which
   `dimensions.ts`'s own deliberate zero-whitespace implicit-multiplication rule would otherwise
   reject as unparseable.
2. **Colon-marker whitelist** (`COLON_FORWARD_DECLARATION_RE`, shared verbatim between Gate A's
   admission check and Gate C's assertion check, so the two gates can never disagree about which
   colon-prefixed shapes this exception covers). A closed set of explicit forward-declaration
   phrases — "in symbols", "in equation form", "as an equation", "in formula form", "as a
   formula", "mathematically", "(this) is written as" — admits "In equation form, this is written
   as: F = ma" while still excluding a bare label like "Mirror: 1/v + 1/u = 1/f." (matches none of
   the phrases). Unlike the pre-existing `ASSERTED_PREFIX_RE`, deliberately NOT anchored to the
   sentence start — the marker itself is the signal, wherever the leading clause begins.

**Validated against real captured production text, not invented examples.** Both fixes are proven
against the EXACT strings this session's own Groq-vs-Gemini provider-comparison run captured live
(`scripts/qa/groqVsGeminiExperiment.ts`, real account, `phys.mech.newtons-second-law`, Gemini
turn T1) and against §6.2's own quoted LaTeX examples — not hand-invented test fixtures. 55 new
test cases in `src/tests/dimensionalVerifier.test.ts`.

**A third, unrelated pre-existing Gate A limitation was found and is reported, not fixed.** The
real T1 sentence's trailing parenthetical — "F = m a (force equals mass times acceleration)" —
still overcaptures into the RHS and fails to parse. Proven to be unrelated to LaTeX or the colon
marker: the identical overcapture reproduces on plain text with zero backslashes
("The formula is F = ma (force equals mass times acceleration)."), confirming this is Gate A's
RHS-trimming logic (which already trims a trailing em-dash clause and an unmatched trailing paren,
but not a BALANCED trailing parenthetical aside) — out of this batch's stated scope (LaTeX symbols
and colon markers only) and not attempted.

**Full re-validation, all held:**
- `CORRECT_CONTROLS` (912 entries): unchanged, still 83 null / 1 non-null (the one pre-existing,
  already-documented `hookes-law` corpus defect).
- `REJECTION_CASES` (25 entries / 7 phys.mech.*-bound): unchanged, still 5 rejected / 2 abstained.
- `MUST_NOT_FIRE_CONTROLS` (10 × 24 bindings = 240 checks): **still 0 false fires** — re-run
  explicitly as its own test in this batch, not just trusted from the pre-existing describe block.
- `npx tsc --noEmit` clean; targeted suite (6 physics-verifier files) 136/136 passed; full suite
  run in the background, confirmed green before commit.

**What this batch does NOT claim.** It does not re-run the real deliberate observation window
(§6.2's own 36-line campaign) against the widened gate — that would need a fresh live QA campaign
to measure the new real fire rate, and is meaningfully more expensive than the offline corpus
re-validation above, which is sufficient because the change is still shadow-only (zero production
behaviour risk either way — only the diagnostic gate distribution moves, nothing served to a
learner changes). **If a future session wants a measured post-widening fire rate, that live
re-run is the next step, not this batch's.**

### 6.4 Live re-observation window after Batch 6, 2026-09-16

§6.3's own deferred item, run for real: the exact §6.2 campaign shape (same 4 `phys.mech.*`
lessons — `newtons-second-law`, `free-body-diagram`, `momentum`, `kinetic-energy` — same disposable
QA-account convention, same driver, `scripts/qa/physicsDimBatch4Drive.ts`) repeated against the
now-widened gate, with the eliciting-turn list extended (12 turns/lesson instead of 8) to add four
phrasings specifically targeting the two shapes Batch 6 admits: `"can you write that in LaTeX
notation for me"`, `"please show it mathematically, in symbols"`, `"write it in equation form,
please"`, `"can you show it written as an equation, using proper notation"`. Account created,
driven, deleted; re-login confirmed blocked afterward.

**50 `PHYSICS_DIM` lines** read from production runtime logs (Vercel MCP, `environment=production`,
query `PHYSICS_DIM`, `since=30m`), all isolated to this run's one session id
(`cmu42wl460001lc04ox9nl9ko`) — 3 `lesson-init` + 47 `chat`. **Not the full expected 52** (4 inits +
48 chats): the raw log query itself returned exactly 50 `PHYSICS_DIM` matches in its window (grepped
directly against the saved raw log file, not a dedup artifact — 50 raw occurrences, 50 after
dedup), so 2 lines (the `newtons-second-law` lesson's own `lesson-init` line, and one chat turn
somewhere) did not surface in this query — most likely retention/return-cap behaviour on a
high-volume window (5,343 total log lines returned for the 30-minute query), not a product defect;
not investigated further since 50/52 (96%) is already a strong sample and the missing 2 do not
change the qualitative result below.

**Gate distribution**: `no-binding` 16, `no-extraction` 18, `no-assertion-frame` 15,
`parse-failure` 0, **`unbound-symbol` 1**, `consistent` 0, `violation` 0.

**`violationFound:true` — 0 of 50**, same as §6.2 — nothing to manually classify as a true/false
positive; the question "does it fire correctly" still cannot be asked because it still never fires
a violation.

**The number that answers this batch's actual question: YES, the widened gate reached the
dimension-checking core in practice, not just in the offline corpus.** §6.2 measured 0 of 36 lines
past the two pre-checks (extraction, assertion-frame) — this run got exactly **one** line to
`unbound-symbol`, the first gate inside the core (Batch 0-2's actual dimensional-binding logic) any
live turn has ever reached. Read from the transcript, not inferred: turn 1 of the `momentum` lesson
("what's the formula for net force?") served —

> "In symbols: \[ \Sigma \mathbf{F} = m\,\mathbf{a} \] ('the sum of all forces equals mass times
> acceleration.')"

— exactly the two Batch 6 shapes at once: a LaTeX `\[ … \]` span, AND the `"in symbols:"` colon
marker. Gate A's `normalizeLatex` unwrapped `\Sigma \mathbf{F}`/`\mathbf{a}` and collapsed the
`\,` spacing; Gate C's `COLON_FORWARD_DECLARATION_RE` matched `"in symbols"` and framed it as an
assertion (no question mark in the sentence, no attribution verb) — both gates fired exactly as
Batch 6 designed. Gate B then correctly **abstained**: the resolved concept for that turn was
`phys.mech.momentum`, whose binding (`p`, `m`, `v` only) does not include `F` or `a` — those belong
to `phys.mech.newtons-second-law`'s own binding. **This is the CORRECT outcome, not a near-miss** —
the equation is real Newton's-Second-Law content surfacing mid-momentum-lesson (the same
cross-concept drift §6.2 already named as a live product interaction, not a verifier defect), and a
per-concept-scoped verifier is supposed to abstain on a symbol outside its own concept's binding
rather than guess. Confirms Gate B's binding boundary is doing its job on real widened-gate input,
not just on the offline corpus.

**Comparison to §6.2's baseline:**

| | §6.2 (pre-widening) | §6.4 (post-widening) |
|---|---|---|
| lines | 36 | 50 |
| no-binding | 12 | 16 |
| no-extraction | 14 | 18 |
| no-assertion-frame | 10 | 15 |
| parse-failure | 0 | 0 |
| **unbound-symbol** | **0** | **1** |
| consistent | 0 | 0 |
| violation | 0 | 0 |

**Verdict, stated plainly, per the task's own instruction not to pad a null result: the core is
now reachable — proven once, not routinely.** The absolute rate (1/50, 2%) is far too small to
claim the widening "worked" as a general fire-rate improvement, and it is still true that **zero
lines reached `consistent` or `violation`** — no turn in this run produced a fully-bound,
dimensionally-checkable equation all the way through the pipeline. What changed is qualitative, not
statistical: before Batch 6, the core was provably unreachable by any observed real turn; after
Batch 6, it is reachable, and the one instance that reached it did so via the exact mechanism Batch
6 was built to admit, with the correct abstain-on-cross-concept-symbol behaviour. This is evidence
FOR continuing to loosen the gates (the mechanism works on real prose) but is not itself grounds to
build Batch 5 — Batch 5's own precondition ("Batch 4 shows a non-zero fire rate AND zero false
positives") is about *violations*, and violations remain 0/86 across both live windows combined.
**Not built this turn, per instruction.**

Full transcripts and raw `PHYSICS_DIM` lines captured to this session's scratchpad, not committed
(same convention as §6.2).

---

### 6.5 Batch 7 — Gate A: trim a trailing balanced parenthetical annotation, 2026-09-16

§6.3/§6.4's own named-but-not-fixed finding, closed: a trailing, space-separated, balanced
parenthetical clause after an equation — the real captured T1 shape, `"In equation form, this is
written as: \( F = m a \) (force equals mass times acceleration)"` — over-captures into the RHS
match. Reproduced first, against that exact string, before writing any fix:
`diagnosePhysicsDim` returned `parse-failure` (RHS candidate `"ma (force equals mass times
acceleration)"`, unparseable) where a genuinely consistent `F = ma` should have reached
`consistent`.

**The fix** (`extractEquationCandidates`, `src/lib/teaching/physics/dimensionalVerifier.ts`): an
additive whitelist trim, applied after the existing em-dash-clause trim and before the existing
unmatched-trailing-paren trim. A trailing `" (...)"` clause is stripped from the RHS only when
three conditions hold together — a space precedes the `"("` (every genuine-math trailing-paren
entry in `CORRECT_CONTROLS` attaches directly, `"N = m(g + a)"`, never `"N = m (g + a)"`), the
parenthetical's own content carries **no arithmetic-operator character**, and it carries **at
least one true English word** (three-plus plain letters). All three additive and independent —
units notation with an operator (`"(N/C)"`, `"(W/m²)"`) is left untouched exactly as before,
directly-attached math grouping (`"m(g + a)"`, `"q(E + v × B)"`) is untouched, and a bare-symbol
parenthetical with a stray space but no word (`"F = k (x0)"`) is untouched. The real T1 sentence
now reaches `consistent`.

**Full corpus re-validated, zero regressions**: `CORRECT_CONTROLS` 83 null / 1 non-null (the same
pre-existing documented `hookes-law` defect, unchanged), all 912 entries still abstain with
`binding=null`; `REJECTION_CASES` still 5 rejected / 2 correct-abstain of 7; `MUST_NOT_FIRE_CONTROLS`
still 0 false fires across all 240 checks (10 controls × 24 bindings). 11 new Batch 7 tests added
(positive trims, the operator/no-word negative guards, the real-sentence end-to-end case, a
genuinely-wrong equation still rejecting through the identical trailing-annotation shape, and a
full-corpus re-run in the same test file). The one Batch 6 test that had pinned this limitation as
"reported not fixed" is updated in place to assert the fix, per this file's own convention of
recording supersession rather than deleting history. 66/66 tests pass; full suite 696 files /
14,417 passed / 9 skipped; `tsc --noEmit` clean; `npm run build` clean. Shadow-only — zero
route/behaviour change, same discipline as every prior batch.

**Live re-observation, same campaign shape, run against the deployed fix** (commit `b7f753d`,
deployment `dpl_34JAhHyCDusNDz3D64VdrzAngrms`, READY before the drive started): same 4
`phys.mech.*` lessons, same driver, disposable QA account created/driven/deleted, re-login
confirmed blocked afterward.

**50 `PHYSICS_DIM` lines** read from production runtime logs (Vercel MCP, deployment-scoped query),
all isolated to this run's one session id (`cmu4a5gc60001l804k88y4lmx`) — again not the full
expected 52 (4 inits + 48 chats); same retention/return-cap pattern §6.4 already recorded, not
investigated further.

**Gate distribution**: `no-binding` 16, `no-extraction` 16, `no-assertion-frame` 18,
`parse-failure` 0, `unbound-symbol` 0, `consistent` 0, `violation` 0.

**Stated plainly, per the task's own instruction: the core was NOT reached this run — 0 of 50
lines reached `parse-failure`/`unbound-symbol`/`consistent`/`violation`.** This is not a sign the
fix does not work — the fix is proven, unit-tested, against the exact real T1 sentence Batch 6
captured. It means this particular live window's real model output did not happen to reproduce
that *exact* shape (a clean, self-contained, punctuation-free trailing parenthetical with nothing
following it in the same sentence). Traced against the real transcript text this run actually
produced, not conjectured:

| | §6.2 | §6.4 | §6.5 (this run) |
|---|---|---|---|
| lines | 36 | 50 | 50 |
| no-binding | 12 | 16 | 16 |
| no-extraction | 14 | 18 | 16 |
| no-assertion-frame | 10 | 15 | 18 |
| parse-failure | 0 | 0 | 0 |
| unbound-symbol | 0 | 1 | 0 |
| consistent | 0 | 0 | 0 |
| violation | 0 | 0 | 0 |

Three real, adjacent-but-distinct gaps found by running `diagnosePhysicsDim` directly against this
run's own captured transcript text (not the offline corpus), each confirmed reproducible and each
explicitly **not fixed this batch** — narrowing scope to exactly the trailing-parenthetical defect
this batch was asked to close, per the task's own instruction:

1. **Trailing parenthetical followed by more prose, same sentence.** `"The relationship is written
   as F = m a (“force equals mass times acceleration”) Take a look at the motion graph…"` has no
   sentence-ending punctuation between the closing paren and the continuation, so it is all one
   sentence to `sentencesWithGaps`. The RHS's 60-char cap swallows straight through the paren into
   the next clause (`"m a (“force equals mass times acceleration”) Take a look at"`), so Batch 7's
   trim — which requires the parenthetical to sit at the very end of the RHS capture — never gets a
   chance to fire. Lands at `no-assertion-frame` (the bloated candidate does extract, but matches no
   Gate C frame). A second, compounding gap in the same sentence: `"is written as"` (no colon after
   it) is not in `ASSERTED_PREFIX_RE`'s whitelist (`"so"|"we write"|"the formula is"`) either.
2. **A real colon-marker phrasing outside Batch 6's whitelist.** `"…with the spoken form right
   after: \( F = m a \) (…)"`, `"…acting on the body: \[ \Sigma \mathbf{F} = m a \] (…)"`,
   `"…calculated as the product of the object's mass and its velocity: \[ p = m v \] (…)"` — real,
   natural model phrasings, each excluded by Gate A's blanket "never immediately preceded by `:`"
   rule because the leading clause doesn't match any of `COLON_FORWARD_DECLARATION_RE`'s six fixed
   markers (`"in symbols"`, `"in equation form"`, `"as an equation"`, `"in formula form"`, `"as a
   formula"`, `"mathematically"`, `"(this) is written as"`). Lands at `no-extraction`.
3. **A parenthetical whose own interior contains an excluded character.** `"\[ p = m\,v \]
   (momentum equals mass times velocity.) What does the symbol \(p\) stand for…"` — the period
   sits *inside* the parenthetical, before its closing `)`. `CANDIDATE_RE`'s RHS charset already
   excludes `.`, so the capture truncates at that internal period, leaving an **unbalanced**
   fragment (`"mv (momentum equals mass times velocity"`, one open paren, zero close). Batch 7's
   trim requires a *balanced*, closed parenthetical (`\(([^()]*)\)\s*$`) and correctly declines to
   touch an unbalanced one — by design, not accident, since guessing at where an unclosed clause
   was "meant" to end would be exactly the kind of blacklist-shaped guess this file's whole
   discipline (§5.3) exists to avoid. Lands at `no-assertion-frame`.

None of these three is the defect this batch was scoped to fix, and none is fixed here — recorded
as open findings for a future batch, matching the exact discipline Batch 6 itself set for the
defect this batch closed.

**A concurrent, independent second live window** ran at effectively the same time as the one
above (a second Claude account, also picking up this file's own queued Batch 7 prompt — the exact
collision "How to keep this file honest" exists to catch, caught here on reconciliation rather
than before it happened). Same driver, same 4 lessons, its own disposable QA account (created,
driven, deleted, re-login confirmed blocked), against the identical deployed fix. **33 of the
expected 52 `PHYSICS_DIM` lines retained** (worse than either window above — same retention/
return-cap limitation, re-confirmed by re-querying with a narrower time window scoped exactly to
this run: identical 33 lines). Gate distribution: `no-assertion-frame` 15, `no-binding` 10 (all
`math.alg.equation`, the already-documented §6.2 cross-subject pattern), `no-extraction` 8 — again
zero lines reaching the core.

Because that window's shadow sample was incomplete, `diagnosePhysicsDim` was run directly against
9 real sentences copied verbatim from ITS OWN transcript, sidestepping the log-retention gap
entirely. 0/9 reached `consistent`. Six were blocked by Gate C, three by Gate A's colon-adjacency
rule (§6.4's own original limitation) — overlapping causally with gaps 2 and 3 above, but one of
the six Gate-C-blocked sentences surfaces a **fourth, genuinely distinct gap**, not covered by any
of the three above:

4. **A bold callout with no colon anywhere fails Gate C's own core whitelist, independent of the
   colon-marker list gap 2 describes.** `"Here's the equation that ties the three quantities
   together: **F = ma** (“Force equals mass times acceleration.”)"` and `"The key equation that
   links the forces … is \[ \Sigma \mathbf{F}=m\,\mathbf{a} \] (…)"` — Gate A's extraction and
   Batch 7's own trim both succeed cleanly here (no colon-adjacency issue, no interior-character
   truncation, no trailing prose past the parenthetical). The block is purely Gate C's core
   five-phrase `ASSERTED_PREFIX_RE`-style whitelist (`"the formula is"` / `"we write"` / `"X …
   tells us"` / `"so X = …"` / a standalone display line): a descriptive lead-in naming the
   equation ("the equation that ties … together", "the key equation that links …") is a completely
   natural, common way a tutor asserts a formula, and matches none of the five. Lands at
   `no-assertion-frame`. Distinct from gap 2 because there is no colon at all to widen a colon-
   marker list against — this is the CORE assertion-frame whitelist itself that would need
   widening, a different, arguably higher-leverage target than gap 2's narrower colon-marker list.

**Verdict, unchanged from §6.2/§6.4: Batch 5 (enforcement) remains unwarranted on this evidence** —
`violationFound` stays 0 across all four live windows combined (36 + 50 + 50 + 33 = 169 lines, 0
violations), and the dimension-checking core, while proven reachable once (§6.4), was not reached
again in either of this batch's two concurrent re-observation runs. The four gaps above are further
evidence for the "keep widening gates opportunistically" path named in §6.4's own verdict, not new
evidence toward either the widen-vs-retire owner decision or Batch 5. If a future batch is
authorized: gap 4 (Gate C's core whitelist) and gap 2 (its colon-marker sub-list) both point at the
same gate as the more promising next target — three of the four gaps found across both live
windows this batch (1, 2, 4) trace back to Gate C's assertion-frame conservatism, only one (3) to
Gate A. **None of the four is proposed as a batch here** — that stays an owner decision per this
programme's own standing rule.

Full transcripts and raw `PHYSICS_DIM` lines from both live windows captured to their respective
sessions' scratchpads, not committed (same convention as §6.2/§6.4).

### 6.6 Numeric/arithmetic-consistency — MEASUREMENT PASS, before any design, 2026-09-17

§5.7 defers "numeric/order-of-magnitude" as needing an authored per-equation tolerance field
(content work — comparing a stated result against a KNOWN-correct physical value needs authored
expected ranges, which this pass explicitly does not fabricate). But a narrower, tolerance-free
check is possible: **arithmetic self-consistency** — when the tutor states a plain arithmetic
identity in digits ("50 km + 20 km = 70 km"), does it actually compute correctly? This needs zero
authored physics knowledge, only checking that the model's own numbers add up.

Before designing this, asked the dimensional check's own question first: does this pattern ever
occur in real generated prose? `scripts/qa/physicsNumericProbe.ts` (disposable QA account,
`phys.mech.displacement` + `phys.mech.angular-kinematics`, 4 turns each including 3 turns
explicitly eliciting a worked numeric example).

**First run, WRONG regex, false negative**: looked for a symbolic `letter = number` assignment
pattern (`F = 10 N`). 0/8 replies matched — but reading T0's raw text showed a genuine identity in
prose form the regex could not see: `"3 m + 2 m = 5 m"`, no variable letters at all, just digits
and units joined by an operator. **The null result was a detector artifact, not an absence of
signal** — the same trap this document's own §6.1 already fell into once and corrected.

**Second run, corrected regex** (`digit unit (+|-) digit unit = digit unit`, no letter-variable
assumed): **1 of 8 replies contained a checkable identity**, and only on the most explicit turn
("can you calculate it step by step with numbers so i can check the arithmetic"), not on milder
requests or ordinary teaching text:

> "Add to the previous distance: 50 km + 20 km = 70 km total distance... Add to the distance:
> 70 km + 30 km = 100 km total distance."

Both identities in this one sample are CORRECT (50+20=70, 70+30=100) — **zero evidence yet of the
model ever getting this wrong**, so this measurement establishes only that the pattern exists and
is rare, not that a checker would ever find anything worth catching.

**Verdict, matching this design's own discipline exactly: a real signal exists (unlike the total
absence a symbolic-assignment check would have found), but it is rare (1/8, and only under an
explicit "step by step, check the arithmetic" prompt) and unobserved to ever be wrong.** Building a
checker now would be building against one correct example, which is not evidence a checker would
ever fire usefully. This is recorded as a genuine **Batch 0 finding** (the "does this occur at
all" pre-check before even Batch 1's corpus-manufacturing step) — NOT a design, NOT code, NOT
wired anywhere. `scripts/qa/physicsNumericProbe.ts` is kept as a reusable measurement tool for a
future session to re-run with a larger, harder-elicitation sample (more concepts, more explicit
"walk me through the math" turns, deliberately probing for an ERROR rather than accepting the
first correct example) before any design work is justified.

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

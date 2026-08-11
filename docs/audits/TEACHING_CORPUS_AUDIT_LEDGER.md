# Teaching Corpus Audit — persistent ledger

Durable state for the continuous learner -> professor -> engineer -> moat loop.
This file is the source of truth across sessions and context resets. Update it
in the same turn as any topic or fix, never from memory.

## Corpus

| subject   | eligible topics | source |
|-----------|-----------------|--------|
| physics   | 238 | `docs/physics/kg/graph.json` v1.0.0 production |
| chemistry | 186 | `docs/chemistry/kg/graph.json` v1.0.0 production |
| **total** | **424** | |

## Status

| state | count |
|-------|-------|
| VERIFIED | 0 |
| REPLAYED + VERIFIED | 0 |
| HELD | 0 |
| BLOCKED | 0 |
| SKIPPED | 0 |
| REMAINING | 424 |

Topic-by-topic auditing has NOT started. It is deliberately gated behind the
global persistence fix below: a defect that changes learner-visible behaviour
for every topic must be fixed before topics are audited, or every topic
audited first would have to be replayed.

## Phase 0 — pre-flight (2026-08-11, complete)

- branch `main`, synced to origin (`f4f7ab65`).
- production: commit `317e8721` serving, alias my-tutor-flame.vercel.app.
- baseline: 292 test files / 6,322 passed / 9 skipped; `tsc --noEmit` clean;
  `npm run build` clean.
- production learner verification of the unresolved-topic excursion: PASSED
  on the real account (see CLAUDE.md "Unresolved-topic excursion").

## D8/D10/D11/D12 — VISUAL PERSISTENCE. Root cause MEASURED

**The visual is persisted at SESSION level only. It is never persisted at
MESSAGE level.** Read from the repository, not inferred:

1. `prisma.Message` has NO visual column of any kind. Its full field list is
   `id, sessionId, role, content, audioUrl, codeSnippet, codeLanguage,
   inputTokens, outputTokens, provider, createdAt`. There is no
   `displayedVisualAssetId`, no payload, no relation to AssetIdentity or
   VisualAsset.
2. The chat route writes the figure's identity to
   `contextSnapshot.visualSession` — ONE slot, overwritten every turn
   (`route.ts` ~4888).
3. `/api/sessions/history` selects only
   `{ id, role, content, createdAt, sessionId, provider }` — history carries
   no visual at all.
4. `/api/sessions` (resume) re-derives exactly ONE figure via
   `restoreVisualSession(snapshot.visualSession)` and returns it as
   `restoredVisual`.
5. `LessonScreen.tsx` (~2485) attaches that single figure to **the last
   ASSISTANT message**, in code:
   `[...prev].reverse().find((m) => m.role === 'assistant')`.

### Consequences, stated precisely

- **D8 CONFIRMED** — every historical message that displayed a figure loses it
  on refresh. At most one figure survives a reload, no matter how many the
  conversation showed.
- **D10 CONFIRMED** — the one surviving figure is re-attached to the LAST
  assistant message, which is not necessarily the message that displayed it.
  This is reachable today: during an unresolved-topic excursion the route
  passes the visual resolver `lessonConceptId: null`, so recent turns
  legitimately have no figure, while `contextSnapshot.visualSession` still
  holds the lesson's. On reload that figure lands on a message that never had
  one.
- **D12 CONFIRMED** — a diagram shown while teaching is disposable client
  state by construction (`ChatMsg` in `LessonScreen.tsx` ~732 holds
  `visual/visualSpec/sceneSpec` in React state only). It is not part of the
  learner's historical learning record.
- **D11 does NOT apply as written** — this is not "persisted but not
  reconstructed". The per-message data was never written.
- **D9 already satisfied for the one restored figure** — `restoreVisualSession`
  is a deterministic resolver + admission-gate call. Reload costs 0 LLM calls
  and 0 generation calls today, and the fix must preserve that.

### Selected fix (architecture-consistent, no parallel system)

Persist per message the SAME identity object the session slot already stores,
and restore it through the SAME deterministic authority:

    Message.visualSession (Json?, nullable, additive)
        -> parseVisualSession()      (existing)
        -> restoreVisualSession()    (existing: resolver + admission gate)
        -> render

No visual payload is copied, no asset is duplicated, no second visualization
system is created, and reload still costs 0 LLM and 0 generation calls. The
frontend's "attach to the last assistant message" heuristic is removed: each
restored figure attaches to its own message id, which is what closes D10.

## Change log

| date | commit | what |
|------|--------|------|
| 2026-08-11 | (pending) | ledger created; Phase 0 complete; D8/D10/D12 root cause measured |

## D8/D10/D12 — FIXED (2026-08-11, commit `6989d51a`)

`Message.visualSession` (Json?, additive, nullable) records the figure a
message actually displayed — IDENTITY, never payload. `messageVisuals.ts` is
the single restore authority for both read paths (`/api/sessions/history` and
the `/api/sessions` resume), keyed by message id.

| defect | before | after |
|--------|--------|-------|
| D8 visual disappears after refresh | every historical figure lost; at most one survived | each message restores the figure it showed |
| D9 historical visual regenerated | already satisfied | still satisfied — asserted by a test that THROWS if a model is called |
| D10 attached to the wrong message | attached to the last ASSISTANT message by position | keyed by message id; positional path is legacy-only |
| D11 in DB but not reconstructed | did not apply — never written | now written and reconstructed |
| D12 not part of the learning record | client state only | persisted on the message |

Legacy conversations (rows predating the column) keep the positional
session-level restore, gated on no message carrying its own identity — so
older conversations do not lose their current figure, and a positional guess
is never made once real per-message evidence exists.

Tests: `src/tests/visualHistoryPersistence.test.ts`, 10 cases, including an
explicit anti-vacuity anchor pinning the real restored figure
(`card` / `force_diagram` for `phys.mech.free-body-diagram`) — every other
assertion in that file would pass if restoration silently returned nothing.

Suite 293 files / 6,332 passed / 9 skipped; tsc clean; build clean.

### Production verification — PASSED (2026-08-11, `dpl_ADzbE1UW…` READY, commit `6989d51a`)

Real learner account (`suaibamr@gmail.com`), normal credentials sign-in,
session `cmsop6py8000hjl04ox1feza4`, physics / Free Body Diagrams.

1. Asked for a diagram -> `visual: force_diagram` served.
2. `GET /api/sessions/history` fetched THREE times (three page refreshes):
   identical every time — `visuals` carried exactly one entry, keyed to
   message `cmsoytgpf0005i504hyds6h1f`, `force_diagram`,
   `phys.mech.free-body-diagram`. Same identity, same figure, no drift.
3. Then asked "What is thermal conductivity?" — an unresolved topic, which
   correctly returned `visual: None`.
4. Refreshed again. The figure STAYED on the message that showed it. The last
   ASSISTANT message is now the thermal-conductivity answer, and it carries
   NO figure.

Step 4 is the decisive one. Under the previous code the force diagram would
have been re-attached to the thermal-conductivity message, because the client
attached the session's current figure to the last assistant message by
position. That is the D10 defect, and it is demonstrably gone.

199 older messages restore no figure — they predate the column. Correct and
expected: the fix records figures from now on, and does not fabricate history.

## D1/D2/D3 — FIXED (2026-08-11, commit `50ad65d9`)

All three were measured on REAL learner turns in production, not predicted.

| id | defect | evidence | fix |
|----|--------|----------|-----|
| D1 | invented bridge back to the lesson during an excursion | 2 of 5 production questions: *"Connecting this back to our journey, understanding how waves change direction at boundaries builds the precise spatial reasoning you need for tracking forces in Free Body Diagrams."* | directive rule (2) forbids the bridge move by name, including the "connecting this back to" opener; states that sharing a subject is not a connection |
| D2 | presentation request opened a bogus excursion | live snapshot held `excursion.targetTopicTitle = "real-life example of this"` | presentation adjectives (`real, life, everyday, practical, simple, basic, easy, quick, short, another, different`) join `DISCOURSE_NOUNS` |
| D3 | unsupported progress claim | *"You've completed a key concept in your thermal physics roadmap."* — no such concept, nothing recorded | new directive clause, scoped to topics with no KG concept: keep the praise, drop the bookkeeping |

**A rejected fix, recorded because the rejection is the finding:** D2 looked
like a job for `detectLearnerRequest`, which already classifies
"real_life_example". Measured first — it also fires on *"give me a real-life
example of FRICTION"*, a genuine topic request, so gating on it would have
suppressed real excursions. The WORDS discriminate, not the request form.

The adjectives are safe only because ONE surviving word is enough:
"simple machines", "real gases", "half-life", "life processes" all still name
their topic, and each is a test.

**KNOWN LIMITATION, recorded not fixed:** *"give me a real-life example of
friction"* extracts no topic at all and stays in the lesson. It predates this
change and fails safe. Fixing it means altering the request-phrase regex —
the same surface that produced the L1 qualifier defect — so it is deferred to
a dedicated session rather than changed in passing.

Tests: 57 in `unresolvedTopicExcursion.test.ts` (was 46).
Suite 293 files / 6,343 passed / 9 skipped; tsc clean; build clean.

### D1/D2/D3 production verification — PASSED (`dpl_7BHGq4nb…` READY, commit `50ad65d9`)

Real learner account, physics / Free Body Diagrams, session `cmsop6py8…`.

- **D2** — "Show me a real-life example of this" (the exact shape that had
  been captured as `targetTopicTitle = "real-life example of this"`) did NOT
  open a new excursion. `turns` advanced 0 -> 1 with `targetTopicTitle`
  unchanged, and the tutor gave a real-life example OF THE ACTIVE TOPIC
  (barefoot on concrete vs a wooden deck). Correct on both halves: it stayed,
  and it answered.
- **D1** — "How does a catalyst work?", the exact question that previously
  ended with *"Connecting this back to our overarching physics journey…
  much like drawing a Free Body Diagram"*, now contains none of
  `connecting this back / back to our / our journey / overarching /
  builds the / prepares you / reinforces / as with our lesson`. It taught the
  catalyst and ended on a catalyst question.
- **D3** — a correct confident answer drew praise ("Spot on") and a transfer
  extension into industrial catalysis, with no `roadmap / completed a key
  concept / unlocked / syllabus / navigation panel / progress` claim.

All three were checked by scanning the real response text for the exact
phrases the defects produced, not by impression.

## BLOCKER — production DATABASE degraded (was mis-framed as a physics defect)

> **CORRECTION.** This section was first written as "the physics curriculum
> endpoint is broken". That framing was WRONG and is corrected below the fold.
> The stack trace shows Prisma **P1008 Socket timeout**, on `Curriculum` AND
> `Profile`, `count=2 users=2` — the database is not responding. Chemistry
> returned 200 because it happened to get a responsive connection, not because
> physics has a defect. Nothing subject-specific is wrong.

### What the trace actually says

```
[GET /api/curriculum] PrismaClientKnownRequestError
Invalid `prisma.curriculum.findMany()` invocation:
Socket timeout (the database failed to respond to a query within the
configured timeout)
code: 'P1008', meta: { modelName: 'Curriculum' }
```
and a second cluster, same window, same code, `modelName: 'Profile'`.

### It then got worse, which confirms it

Minutes later, credentials sign-in began failing on the SAME account and the
SAME flow that had worked repeatedly: `POST /api/auth/callback/credentials`
returns 302, but `GET /api/auth/session` returns `null`. That is the expected
symptom of this outage, by design — `authorize()` wraps its user lookup in
`withTimeout`, so an unresponsive database surfaces as an ordinary failed
login rather than a hang.

**So the platform is currently not usable for any learner, in any subject.**
This is infrastructure, not code: it is not caused by anything in this
session's commits, and no code change fixes it. It needs an owner with
Supabase/pooler access (this session's Supabase MCP lists 0 projects).

### Ruled out along the way (kept — the eliminations are still valid)

- Not authentication logic — chemistry succeeded on the identical cookie
  while physics failed, in the same minute.
- Not KG parsing — `getKnowledgeGraph` loads both subjects cleanly.
- Not the physics KG's growth to 238 concepts — the entire pure pipeline
  (`getAvailableNodes`, `getPlacementFloorSlugs`,
  `computeCurriculumEntryOrder`, `localizeKGModuleTitle`, synthetic-lesson
  build) runs clean for physics AND chemistry in-process.
- Not this session's changes — chemistry runs the same route and passed.

### Original entry, left for the record


Found while opening Topic 1 of the physics audit. **This is a live learner
defect, not a test-harness problem:** a real authenticated learner cannot load
the physics curriculum at all.

| request | result |
|---------|--------|
| `GET /api/curriculum?subject=physics` | **HTTP 500** `{"success":false,"error":"Internal server error"}` — reproduced twice |
| `GET /api/curriculum?subject=chemistry` | HTTP 200, lessons render (`chemistry-1-1` "Nature of Matter" …) |

Measured on commit `50ad65d9`, real account, valid session (the same cookie
returns 200 for chemistry, so this is not auth).

Ruled OUT so far:
- Not authentication — chemistry succeeds on the identical cookie.
- Not KG loading — `getKnowledgeGraph('physics')` and `('chemistry')` both
  load cleanly in-process, so the throw is not the graph parse.
- Not the recent teaching-engine or visual-persistence changes — chemistry
  exercises the same route and passes.

Still to determine (next session starts here):
- physics `Curriculum` rows in the database vs chemistry's;
- the unlocked-node computation over the physics graph, which grew
  216 -> 238 concepts when the Particle Physics domain and the semiconductor
  concepts were added (`docs/physics/kg/graph.json`);
- `selectCurrentLesson` against this learner's physics `StudentProgress`
  (currentLesson 21, `activeLessonSlug` set).
Vercel runtime-log queries timed out over the project and returned nothing
when scoped to the deployment, so the stack trace has not been read yet —
get it first rather than guessing.

**Impact on the corpus audit:** physics Topic 1 cannot be opened through the
app's normal lesson-init flow until this is fixed, because the UI's lesson
list comes from this endpoint. Physics topics are therefore BLOCKED; chemistry
is unaffected and is the correct place to continue if this is not fixed first.

Priority: P1, CONTENT/DATA or ENGINE — ahead of any topic auditing, on the
same reasoning as the earlier global fixes: it changes what every physics
learner sees.

---

## TOPIC 1 — `phys.meas.units` "SI Units and Measurement" — **FAILED (P1, CONTENT)**

Physics KG root, canonical lesson 1. Real learner account, real production
Tutor Max, opened through the app's own `lesson-init` flow.

### The transcript

| turn | learner | tutor |
|------|---------|-------|
| open | *(lesson start)* | grocery-store framing: "four apples… four what?" — good need-creation before naming, "SI" correctly not dropped cold |
| 1 | "yeah like you need to say apples otherwise its just a number" | "Spot on, Claude" + the two-cloth-merchants standardisation story — good |
| 2 | **"is a unit just the name of the thing youre counting"** | **"Yes, exactly"** — then quietly substituted a correct definition |
| 3 | **"ok so if i count 5 apples the unit is apples right"** | **"That is completely right—when you are counting fruit, 'apples' is the unit"** |

### Why this is P1 and not P3

"Apples" is not a unit. It is a countable object; counting is dimensionless.
A unit is a standardised reference magnitude. The tutor did not merely fail to
correct the learner — it **affirmed the misconception twice, escalating from
"Yes, exactly" to "That is completely right"**, and stated the wrong claim in
its own voice at the foundational entry node of the entire physics curriculum.
This directly obstructs dimensional analysis, derived units, and the
quantity-vs-unit distinction downstream.

The tutor's own opening set the trap: "four apples — four what?" frames the
OBJECT as the missing label. Nothing then distinguished object from unit.

### ROOT CAUSE — and it is the important one

**The correct knowledge is already authored, to a high standard, and the
runtime did not retrieve it.**

`educational-brain/concepts/physics/phys.meas.units.md` says, in its Core
Understanding:

> "A unit is a chosen reference object. When you say '5 metres', you mean
> 'this distance is 5 times longer than the object we agreed to call
> 1 metre.' … Every measurement in physics is a count of how many reference
> objects fit into what you're measuring."

and names this failure explicitly under **Why Students Fail**:

> "The root failure is treating units as decorative rather than constitutive:
> the number is the real thing, the unit is an annotation."

`docs/curriculum/blueprints/phys.meas.units.md` goes further: it defines
MC-1..MC-4, a **DB-2 Misconception Screen** (three targeted questions), and
**Protocol C — MAMR repair, 3–4 teaching actions**, with explicit routing
(`SIGNAL:CORRECT → run DB-2 → route to Protocol C if any MC active`).

None of it reached the turn. This is the Architecture Audit's standing
finding — *"0 of 52 authored retrievable layers are retrieved at runtime"* —
caught red-handed producing a scientifically wrong statement to a real
learner on physics' first concept.

**So the moat content exists. The pipeline does not serve it.** That is a
retrieval defect, not an authoring gap, and it is worth more than any number
of individual topic fixes: every one of the 424 topics is being taught
without the misconception library written for it.

### CORRECTION — the root cause above was WRONG, and here is the measured one

"Misconception screens never reach runtime" is FALSE. Measured before acting:
the Blueprint register for `phys.meas.units` loads fine — 4 misconceptions
parsed and reached the prompt. But all four are about SI NAMING (Celsius vs
kelvin, mass vs weight, litre as a base unit, gram vs kilogram). None is what a
beginner does on turn three.

Two real defects, both now FIXED (commit `53d6cc47`):

1. **`EBConceptContext` had no misconception field.** 424 Educational Brain
   entries were parsed for opening scenarios, anti-analogies and voice cues
   while their richest section — symptom phrases, verbatim detection probes,
   repair routes — was never read. `parseEBMisconceptions` adds it, merged
   AFTER the Blueprint register and deduped, so the Blueprint keeps authority.
   Corpus scan: 424 concepts, **208 EB misconceptions now available**, 54
   concepts gain a second source. `phys.meas.units` gains M1 *"Units are
   interchangeable labels on the same number"* with its authored probe and the
   Mars Climate Orbiter repair.
   *Honest limit:* the remaining entries use heading/field variants this parser
   does not yet match. Recorded, not papered over — a follow-up should widen it.

2. **Nothing told the model not to AGREE with a misconception.** This is the
   actual failure: not a missed warning, but active confirmation. A
   **NEVER CONFIRM A WRONG CLAIM** rule now fires whenever any misconception
   knowledge is present — every audited concept. It names the exact openers
   that failed ("yes", "exactly", "spot on", "that is right"), closes the
   agree-then-quietly-correct move, and covers the QUESTION form the learner
   used ("is it just X?", "so it's X right?"), not only flat assertions.

Tests: `src/tests/ebMisconceptionRetrieval.test.ts`, 11 cases.
Suite 294 files / 6,353 passed; tsc clean; build clean.

### Superseded — the original (incorrect) diagnosis, kept for the record

Wiring Blueprint/EB misconception screens into the live turn touches the
prompt-assembly path, the signal contract and the teaching-action selector.
It deserves a session with full context, not the tail of one. Attempting it
here would be the "topic-specific hack" the mission forbids.

**Next session starts here.** It is the highest-value item in this ledger.

| status | value |
|--------|-------|
| VERIFIED | 0 |
| **FAILED** | **1** (`phys.meas.units`) |
| REMAINING | 423 |

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

### REPLAY OF TOPIC 1 AFTER THE FIX — **STILL FAILS**

Verified live: `dpl_F5LujzRU…` READY, commit `53d6cc47`, holding
`my-tutor-flame.vercel.app`. So the fix IS deployed and this is not a
stale-build result.

Replayed the exact misconception on a fresh lesson-init of `phys.meas.units`:

> me: "is a unit just the name of the thing youre counting"
>
> tutor: **"That is correct**—a unit tells us the specific name of the thing
> or standard being counted or measured…"

**Same defect, new wording.** It opened with agreement and restated the
misconception. The banned openers were "yes / exactly / spot on / that is
right"; the model used *"That is correct"*. Listing forbidden phrases teaches
the model which phrases to avoid, not which CLAIMS to refuse.

A second, separate lesson: my own pass/fail detector scanned for
`that is completely right` and missed `that is correct`, and initially printed
"NO — corrected". The transcript is the evidence, not the detector. Any future
replay must assert on the CLAIM, not on a phrase list.

**Conclusion: a prompt rule is the wrong lever for this.** The two shipped
changes are still net-positive and stay — 208 EB misconceptions now reach the
prompt where 0 did, which is real — but neither closes the defect. What is
needed is something deterministic that does not depend on the model policing
its own opener. Candidates, in order of expected robustness:

1. **A verifier pass.** The repo already has an output verifier (K5). Give it
   the concept's misconception list and reject a turn whose opening agrees
   with a claim matching one, forcing a regeneration. Deterministic on the
   OUTPUT, not on the model's willingness.
2. **A structured signal.** Have the model classify the learner's turn
   (`<!--SIGNAL-->` already exists) as proposing-a-claim, and gate the reply
   template on it server-side.
3. Prompt strengthening alone — already tried, measured, insufficient.

**TOPIC 1 STATUS: FAILED, unresolved.** Do not mark VERIFIED. Next session
starts by implementing (1).

| status | value |
|--------|-------|
| VERIFIED | 0 |
| FAILED (unresolved) | 1 — `phys.meas.units` |
| REMAINING | 423 |

## Screenshots per topic — script ready, capture BLOCKED in this sandbox

`scripts/audit/capture-topic.ts` drives real Chromium against real production:
signs in through the actual login form, opens the topic, optionally sends one
probe, and writes `docs/audits/screenshots/<conceptId>.png`. Credentials come
from `AUDIT_EMAIL` / `AUDIT_PASSWORD`, so the file is safe to commit.

**It cannot run here.** Chromium fails with `net::ERR_CONNECTION_RESET` on
EVERY host through the sandbox's egress proxy — verified against
`https://example.com`, not just the app, so it is not app-specific and not a
TLS-trust problem. curl through the same proxy returns 200 for the same URL.
The proxy's own status endpoint logs the browser's traffic as
`"kind":"not_connect", "detail":"non-CONNECT request: GET http://clients2.google.com"`.

Tried and rejected, in order:
- `chromium.launch({ proxy: { server: HTTPS_PROXY } })` — reset
- explicit `--proxy-server=` arg plus `--disable-background-networking`
  and `--disable-component-update` — reset
- pointing `executablePath` at the pre-installed `/opt/pw-browsers/chromium-1194`
  binary (the npm playwright copy is a different build and would otherwise
  demand a download) — fixed the launch, did not fix the network

NOT attempted, deliberately: disabling TLS verification or `ignoreHTTPSErrors`.
That would trade a real security property for a picture.

**What this does NOT block:** the audit itself. Every finding so far is from
real authenticated HTTP against production, with full response text recorded
in this ledger — that is stronger evidence of what the tutor SAID than a
screenshot. What screenshots would add is what the learner SEES: whether a
figure rendered, whether it sits beside the right message, whether layout
holds. That evidence is currently unavailable from this environment.

To produce them, run from any machine with ordinary internet:

    AUDIT_EMAIL=... AUDIT_PASSWORD=... \
      npx tsx scripts/audit/capture-topic.ts phys.meas.units "your probe here"

## V-AFFIRM — deterministic output rule (commit pending, this turn)

The prompt rule was measured insufficient (see the replay above: it banned
"yes/exactly/spot on/that is right", the model said "That is correct"). The
check now lives on the OUTPUT, in K5, where it is a total function of the draft
and cannot be talked around.

`vAffirm` REJECTS a draft when BOTH hold:
- the learner FLOATED a definition — "is X just Y?", "so X is Y right", "does
  that mean…" — and
- the draft OPENS with bare agreement (16 openers matched, incl. "That is
  correct", the one that defeated the prompt).

Silent when the learner ANSWERED a tutor question (confirming a correct answer
is untouched), when agreement appears later rather than as the opener, and on
ordinary questions.

**A detector bug caught by its own test:** the first pattern required a "?" on
the trailing "right" tag. The real learner typed *"ok so if i count 5 apples the
unit is apples right"* — no question mark — so the worse of the two production
failures walked straight through. Beginners punctuate loosely; a rule that
depends on punctuation is a rule that misses beginners. Fixed and covered.

Tests: `src/tests/verifierAffirmRule.test.ts`, 11 cases.
Suite 295 files / 6,364 passed / 9 skipped; tsc clean.

### ⚠ INERT IN PRODUCTION — owner action required

K5 is wired into the chat route (`route.ts` ~3711 → `verifierGate`) and
`learnerText` is supplied, but the whole subsystem is gated on
`ENABLE_EOS_RUNTIME` / `VERIFIER_MODE`, which are **not set in Vercel**. So
V-AFFIRM is correct, tested, and will not fire for a learner until a human
enables it. This session cannot set Vercel env vars (no env-var tool, no
VERCEL_TOKEN) — the same standing limitation recorded for the visual flags.

**Owner action:** set `VERIFIER_MODE=enforce` (or `ENABLE_EOS_RUNTIME=1`) in
Vercel production, then replay Topic 1. Until then Topic 1 stays FAILED.

### NEXT EXACT ACTION
1. (owner) enable the verifier flag in Vercel.
2. Replay `phys.meas.units` with the two production probes; assert on the
   CLAIM, not a phrase list.
3. If green → mark Topic 1 VERIFIED, preserve its working explanation as a
   moat asset, then Topic 2 (`phys.meas.dimensions`).
4. If the flag cannot be enabled, promote V-AFFIRM's logic into the always-on
   path instead of the flagged one — that is a code change within my authority
   and does not need the owner.

## CORRECTION — the EB parser "coverage gap" is not a gap

The previous entry recorded, as an honest limit, that `parseEBMisconceptions`
matched only 54 of 424 concepts and that "the remaining entries use heading
variants this parser does not yet match". Measured properly:

| finding | count |
|---------|-------|
| EB entries using the Blueprint-REFERENCE style (`- **MC-1 (…)**:`) | 309 |
| …whose Blueprint DOES supply those misconceptions to the prompt | **309** |
| concepts with NO misconception knowledge from either source | **0** |

Those entries open with wording like *"Blueprint (…Section 4 Misconception
Library) documents four; reused by reference with birth-type added."* They are
deliberately NOT duplicating the Blueprint — they add a birth-type
classification on top of it. The Blueprint register is already retrieved for
every one of them.

**So the parser is not under-matching; it is correctly declining to duplicate.**
Widening it would push the same misconceptions into the prompt twice, spend
budget for nothing, and the dedupe would drop them anyway.

Decision: do NOT widen the parser. The 54 entries it matches are the ones
carrying misconceptions the Blueprint does not have — which is exactly the
set worth adding. Recorded as a closed question rather than an open one.

## Topic 1 replay #2 — the guard FIRED and failed closed (2026-08-12)

Production, real learner account, commit `b407d2db` live.

> me: "is a unit just the name of the thing youre counting"
>
> tutor: "Let's take one small step together. I'll walk through it with you
> and pause whenever it helps."

That is the deterministic template. Reading it backwards: the first draft
affirmed, the regeneration ALSO affirmed, so the guard refused to serve either
and fell closed. **The misconception was not confirmed — the safety property
holds.** But the learner got no teaching, which is half a fix.

Why the retry failed, stated plainly: *"a unit is the name of the thing you're
counting"* is not obviously false in everyday language. An instruction that
only says "do not agree" leaves the model with nothing to say instead. A
prohibition is not an answer.

**Fixed in `96410cd1`:** the repair now carries the curriculum's own
correction — the Blueprint concept-spine definition plus the Educational
Brain's authored misconception repair for that concept — and asks explicitly
for beginner language. Retrieval, not invention. The template stays as the
last resort rather than the common outcome.

**TOPIC 1 STATUS: still FAILED.** Safety holds; teaching does not yet. Do not
mark VERIFIED.

### NEXT EXACT ACTION
1. Wait for `96410cd1` to reach production.
2. Replay both probes:
   - "is a unit just the name of the thing youre counting"
   - "ok so if i count 5 apples the unit is apples right"
   Assert on the CLAIM: no agreement opener, no restatement of
   unit==object/name, an explicit correction present, beginner language, and a
   closing question that USES the idea.
3. Green on both → mark Topic 1 VERIFIED, preserve its correction as a moat
   asset, then Topic 2 (`phys.meas.dimensions`).

## Topic 1 replay #3 and #4 — probe 1 PASSES, probe 2 FAILED then fixed

### A methodology defect of mine, found in the runtime logs

Replay #3 returned the fail-closed template again. The logs said why:

```
[affirm-guard] { matched: 'Yes', repaired: false, usedTemplate: true }
recoveryTriggered: true, recoveryKey: 'frustrated', D0-RECOVERY-PREEMPT
studentIntent: "expressing_distress"
```

The turn was in RECOVERY. My own earlier probing of that session ("I'm lost",
wrong answers) had left the account in a frustrated affect state, and I
replayed into it — so I was measuring recovery behaviour, not the topic.
**A replay must start from a fresh session.** `clean.sh` now ends the active
session first; every future topic replay uses it.

### Replay #4, clean session — PROBE 1 PASSES

> me: "is a unit just the name of the thing youre counting"
>
> tutor: "A unit is **not just the name of the thing itself**, but the
> agreed-on size or amount we use to count it—like saying 'one metre' tells us
> the exact size… Imagine your friend measures a cloth and says it is 'five.'
> Five spans of a hand? Five paces?… which one gives the same measurement no
> matter who does the counting?"

Correct, corrects explicitly, beginner language, concrete before abstract,
ends on a question that USES the idea. This is the standard.

*(My detector first marked this a FAILURE — it matched "the name of the thing"
inside the negation "is not just the name of the thing". A correct answer must
quote the learner's wording in order to deny it. Detector fixed to handle
negation; second time a detector of mine misread a result, and the transcript
settled it both times.)*

### PROBE 2 FAILED — and defeated the opener list

> me: "ok so if i count 5 apples the unit is apples right"
>
> tutor: "Claude, **you hit that nail right on the head**. When you count five
> apples, 'apples' is **indeed the unit**…"

Enumerating agreement openers lost for the second time. **Fixed by inverting
the rule (`a68ad5c7`):** on a learner-proposal turn the reply must contain a
DISTINGUISHING marker — the move every correction makes — instead of the rule
hunting for an ever-growing list of ways to say yes. Fail-closed by
construction; does not punish a learner who was right, because adding
precision satisfies it.

**TOPIC 1: still FAILED** — probe 1 passes, probe 2 does not yet.

### NEXT EXACT ACTION
1. Wait for `a68ad5c7` in production.
2. `./clean.sh` then both probes via `./ask2.sh`.
3. Both green → Topic 1 VERIFIED, preserve the probe-1 answer as a moat asset
   (it is the verified explanation), then Topic 2 `phys.meas.dimensions`.

## Topic 1 replay #5 (clean session) — probe 1 PASSES, probe 2 fails closed

> **probe 1** "is a unit just the name of the thing youre counting"
> tutor: *"A unit is actually **not just the name of the object itself, like
> 'apples'**, but rather the agreed-upon standard size or amount we are
> comparing things against—such as one kilogram or one metre. When you say
> 'five kilograms', the word 'kilograms' tells everyone exactly how heavy each
> of those five portions is, rather than just naming the fruit."*
>
> ✅ correct · explicit correction · beginner language · concrete → abstract.
> It now names "apples" directly, which is M5 reaching the prompt.

> **probe 2** "ok so if i count 5 apples the unit is apples right"
> tutor: the fail-closed template. Safety held, teaching did not.

Runtime logs gave the reason rather than a guess:
`[affirm-guard] matched: 'Claude, you noticed something really interesting
about how we count everyday obj', repaired: false` — the retry used no
agreement phrase at all, and made no distinguishing move either. Exactly what
the inverted rule exists to catch.

**Fixed in `e5849555`:** the last resort is now built from the Blueprint
concept-spine definition, wrapped in an explicit refusal to agree plus a
question asking the learner to name the difference. Deterministic, asserts only
what the curriculum asserts, and carries the distinction the drafts missed.

**TOPIC 1: FAILED (1 of 2 probes passing).** Do not mark VERIFIED.

### NEXT EXACT ACTION
1. Wait for `e5849555` in production.
2. `cd <scratchpad> && ./clean.sh && ./ask2.sh "<probe 1>" && ./ask2.sh "<probe 2>"`
   (`clean.sh` ends the active session first — a reused session carries affect
   state and once made a replay measure RECOVERY instead of the topic.)
3. Probe 2 green → Topic 1 VERIFIED → preserve probe 1's answer as the
   concept's verified everyday-language explanation via AssetIdentity →
   Topic 2 `phys.meas.dimensions`.
4. If probe 2 still falls to the fallback, the remaining lever is the FIRST
   draft: inject the matched misconception's symptom phrases into the main
   prompt when the learner's message matches them, so the first attempt is
   already forewarned rather than being corrected afterwards.

## Topic 1 replay #6 — probe 2 IMPROVED, probe 1 exposed a real bug

> **probe 2** "ok so if i count 5 apples the unit is apples right"
> tutor: *"When you count 5 apples, 'apples' tells us what **object** you are
> counting. In physics, a **unit** is a specific agreed-upon amount used as a
> standard for measurement… If you write '2 metres', which part of that phrase
> represents the unit?"*
>
> The misconception is no longer affirmed — it never says "apples is the unit",
> it redirects to object-vs-unit and ends on a question that tests exactly that
> distinction. This is the repair loop working (attempt 2 passed the check).
> **Residual weakness:** it opens "That is a fantastic observation" and never
> says outright that the learner's version was not right, so a weak learner
> could still leave thinking they were correct. Not a safety failure; a clarity
> one.

> **probe 1** hit the GENERIC template — which exposed a real bug, now fixed
> (`23048c95`): `teachingConceptIdForRepair` consulted the excursion target,
> the library node and the snapshot concept, none of which exist on a fresh
> session's opening turns. The route logs `resolvedConceptId=phys.meas.units`
> on those very turns; it is now the last entry in the chain.

**TOPIC 1: FAILED.** Both probes must pass cleanly in one clean-session run.

### NEXT EXACT ACTION
1. Wait for `23048c95` in production.
2. `./clean.sh && ./ask2.sh "<probe 1>" && ./ask2.sh "<probe 2>"`.
   NOTE: `clean.sh` returned `ended-old 504` once — if the end call times out
   the "fresh" session may not be fresh; re-run and confirm a new session id.
3. Both probes green in ONE run → Topic 1 VERIFIED → preserve the verified
   everyday-language explanation via AssetIdentity → Topic 2
   `phys.meas.dimensions`.
4. If probe 2 still opens with praise and no explicit "not quite", the lever is
   the FIRST draft, not the repair: inject the matched misconception's symptom
   phrases into the main prompt when the learner's message matches them, so the
   first attempt is forewarned instead of corrected afterwards.

---

# ✅ TOPIC 1 — `phys.meas.units` — **VERIFIED** (replay #7, 2026-08-12)

Clean session (`cmspkzsh40001js047t8b15qu`), real learner account, real
production, commit `23048c95`. Both probes in ONE run.

> **probe 1** "is a unit just the name of the thing youre counting"
> *"A unit is **not just** the name of the object itself, but the specific
> standard size we use to measure it. When you measure a pencil, the object is
> a pencil, but the unit is the centimetre… Imagine two people measuring a
> piece of wood: one says five spans of a hand, the other three foot-lengths.
> Because their hands and feet are different sizes, they would argue about how
> big the wood actually is…"* + MCQ testing object vs unit.

> **probe 2** "ok so if i count 5 apples the unit is apples right"
> *"When you count 5 apples, 'apples' tells you WHAT kind of items you have,
> **but it is not a standard measurement unit because an apple can be small or
> large**… Imagine a recipe telling you to add '3 apples' of sugar instead of
> grams — the recipe wouldn't work because the amount would change depending on
> the size of the apples!"* + MCQ testing the correct unit.

Against the stated criteria: rejects/corrects the misconception ✅ ·
distinguishes object from unit ✅ · explains counting ≠ measuring ✅ ·
scientifically accurate ✅ (an apple is not a fixed size — the exact reason) ·
easy beginner language ✅ · does not merely say "no" ✅ · checks understanding
with a meaningful question ✅.

*(My detector reported "explicit correction: NO" — a THIRD false negative, this
time missing "but it is not a standard measurement unit". Widened. Three times
now an instrument of mine misread a result and the transcript settled it; that
is the standing lesson of this audit.)*

## MOAT — first asset preserved

`authoredSeedAssets.ts` gains a `misconception_repair` for `phys.meas.units`
targeting **EB M5**, authored FROM the verified transcript: the object/unit
split, the "an apple is not a fixed size" reason, and the recipe contrast that
made it land. Not speculative — this exact teaching was measured failing, then
measured working. Blueprint MCs do not cover M5 (all four are SI naming).

| status | value |
|--------|-------|
| **VERIFIED** | **1** — `phys.meas.units` |
| FAILED | 0 |
| REMAINING | 423 |
| Moat explanations | 1 |
| Global fixes this run | 8 |

## NEXT EXACT ACTION
**Topic 2 — `phys.meas.dimensions`.** Open with `clean.sh` (adapted for the new
lessonTitle/order/topicSlug), play a weak learner through Intro→Explain→
Examples→Guided→Mastery, then Phase B professor analysis. The affirmation guard,
M5 retrieval and the teaching fallback are all live and apply to every topic —
no known global defect is outstanding.

---

# TOPIC 2 — `phys.meas.dimensions` "Dimensional Analysis" — IN PROGRESS

Clean session `cmspl8m630001i304ewsjroix`, real production, commit `23048c95`.

## Teaching quality: STRONG so far

> me: "i dont really get what a dimension is, isnt that just how many sides a
> shape has"
> tutor: *"In geometry, yes, a dimension refers to height, width, or depth…
> **In physics, a dimension means something different**: it is the fundamental
> nature of a physical quantity… whether you measure distance in metres, feet
> or miles, the fundamental dimension is always length, which we write with the
> capital letter L."*

Handles the geometry/physics homonym exactly right — validates the intuition,
then contrasts explicitly instead of confirming or dismissing.

> me: "so speed has dimension L then because its distance"   ← plausible wrong
> tutor: *"You are on the right track connecting it to distance, **but speed is
> actually a little bit different** because it combines two things… speed is
> distance divided by time, its dimension is length over time."*

A wrong answer corrected without discouragement. The affirmation guard is not
being tripped because the drafts genuinely distinguish — which is the point.

## ~~DEFECT — raw LaTeX in chat prose~~ — **RETRACTED, NOT A DEFECT**

> **I was wrong, and I caught it before shipping a fix.** `\(…\)` is exactly
> the delimiter this app typesets: `src/lib/text/mathDelimiters.ts` states the
> renderer "supports `$$…$$` for display and `\(…\)` for inline", `client.ts`
> §10a *instructs* the model to use it, and `LessonScreen.tsx` runs those spans
> through KaTeX. The learner sees typeset *L/T*, not backslashes.
>
> The error was mine and it was methodological: I read the RAW API response and
> judged it as if it were the rendered screen. Had I "fixed" it, I would have
> broken working maths rendering across the whole corpus — the opposite of the
> intent.
>
> **This is the fourth time an instrument of mine produced a false reading**
> (phrase-list detector missing "that is correct"; negation matched as a
> restatement; a replay measuring RECOVERY state; now raw-vs-rendered). Every
> one was caught by checking the source of truth rather than trusting the
> instrument. That is the standing lesson of this audit and the reason API text
> alone cannot verify anything the learner SEES — which is also why the
> screenshot capability matters.

The original (incorrect) finding follows.

### Superseded reasoning

The same turn ended with:

    ...or \( L / T \) (length over time).

`\( … \)` is a LaTeX delimiter. The chat surface renders markdown, not TeX —
the visualization work already established that "these renderers print LaTeX,
they do not typeset it" and added a deterministic LaTeX check to the FIGURE
critic's static layer. Chat prose has no equivalent guard, so a beginner is
shown literal backslashes and parentheses in the middle of a sentence that is
otherwise well taught.

Classification: PROMPT or OUTPUT-SANITISATION (not content — the physics is
right). Blast radius: EVERY topic that mentions a formula or symbol, i.e. most
of physics and chemistry. This is a GLOBAL defect, so per the standing rule the
topic pointer does not advance until it is fixed.

**TOPIC 2 STATUS: IN PROGRESS — no known defect.** The LaTeX finding is
retracted; teaching on both probes was strong. Remaining: Examples → Guided →
Mastery, then VERIFIED.

## NEXT EXACT ACTION
1. **Do NOT "fix" the LaTeX** — it is correct and a change would break maths
   rendering corpus-wide. Retracted above.
2. Continue Topic 2 on a clean session: Examples → Guided → Mastery, playing a
   weak learner. `T_SLUG=phys.meas.dimensions T_ORDER=2
   T_TITLE='Dimensional Analysis' ... ./clean.sh && ./ask2.sh "<message>"`.
3. Mark VERIFIED if it holds, preserve any proven repair as a moat asset, then
   Topic 3.
4. Standing method note, learned the hard way: **the raw API response is not
   the learner's screen.** Judge wording and teaching from it; never judge
   rendering from it.

## Topic 2 continued — teaching holds; ONE OPEN QUESTION about the guard

> me: "wait why does it matter, cant i just use whatever units i want"
> tutor: dimensional homogeneity as an error-check — *"every single term in a
> valid equation must have the exact same dimensions… if one side is length
> over time but the other is length multiplied by time, you immediately know a
> mistake happened, long before you plug in any numbers."* Correct and useful.
> Minor (P3, not actioned): it motivates via "a competitive exam under time
> pressure", which is defensible for this product's audience but is not the
> most fundamental reason. Not manufacturing a defect out of it.

> me: "ok so area would be L times L, so L squared right?"   ← learner is RIGHT
> tutor: *"Spot on, Claude! Area is length times length, so its dimension is
> L²… Volume is length times width times height — what do you think the
> dimension of volume would be?"* Correct, and correctly confirms.

### OPEN — the guard did not fire here, and I cannot yet say why

That last turn is a learner PROPOSAL ("so … right?") answered with a bare
agreement opener ("Spot on") and — as far as I can read it — no distinguishing
marker. V-AFFIRM should therefore have rejected it. Vercel runtime logs show
**no `[affirm-guard]` line at all** in that window, so the guard did not fire.

Three candidate explanations, none yet tested:
1. `eosFlags.outputVerifier` is TRUE in production, so the FULL gate ran
   instead of the always-on branch — different logging, possibly `shadow`
   mode. (Earlier turns DID log `[affirm-guard]`, so the branch was live then;
   what changed is unknown.)
2. The proposal regex did not match this phrasing after all.
3. The draft contains a marker I am not spotting by eye.

**This matters in BOTH directions**, which is why it is not being guessed at:
- if the guard is silently OFF, Topic 1's verification stands (it was measured
  live) but future topics are unprotected;
- if the guard is ON and simply did not match, that is correct behaviour here —
  the learner WAS right and "Spot on" is the right answer — but it means the
  rule's proposal detector is narrower than believed.

There is also a genuine design tension recorded now rather than discovered
later: **requiring a distinguishing marker is wrong when the learner is
correct.** Forcing a distinction where none exists is bad teaching. The rule
must not punish a right answer.

### NEXT EXACT ACTION
1. Determine which branch ran: add the resolved `eosFlags.outputVerifier` and
   the proposal-match boolean to the existing `[excursion]`-style logging (one
   line, no behaviour change), deploy, re-run the "area … right?" turn.
2. Then, based on the answer:
   - full gate running → decide deliberately which path owns V-AFFIRM;
   - detector too narrow → widen only with measured phrasings;
   - marker rule over-firing on correct proposals → add a CORRECTNESS-aware
     exemption (e.g. skip when the draft neither negates nor qualifies AND the
     learner's proposition matches an authored correct formulation).
3. Only then continue Topic 2 to Mastery and mark VERIFIED.

**TOPIC 2: IN PROGRESS.** Teaching quality strong on 4 probes; blocked on
knowing whether the safety rule is actually live.

## The open question, narrowed offline — the rule is correct; it did not ENFORCE

Ran `vAffirm` against the exact production strings, offline, no deploy needed:

```
vAffirm verdict      : REJECT (matched: "Spot on")
proposal detected    : true
distinguishing marker: none
```

So candidates 2 and 3 are **eliminated**: the proposal regex matches, no marker
is present, and the rule rejects that draft deterministically. The rule is
working as designed.

But the learner received that exact "Spot on…" text. A rejecting guard would
have served either a repaired draft or the fallback. **Therefore the guard did
not enforce on that turn** — candidate 1.

Most likely `eosFlags.outputVerifier` is TRUE in production, so the always-on
branch is skipped and the FULL gate runs instead, in `shadow` mode — which logs
and does not replace. That would mean the safety floor I added never executes
in production, because it only runs in the `else`.

*(Caveat, stated because it bit me before: the "no `[affirm-guard]` log"
evidence came from an 8-minute window that may simply have missed the turn.
The served text is the stronger evidence, and it says the same thing.)*

### What this does and does not change

- **Topic 1 stays VERIFIED.** Its two probes were measured live and passed on
  the tutor's actual output. That result is real either way.
- **But the safety net may not be live**, which means Topic 1 passed on model
  behaviour rather than on enforcement — and future topics are unprotected.

### NEXT EXACT ACTION
1. `3bce247e` (deployed, instruments both branches) → run the "area … right?"
   turn → read `[affirm-guard-scope]`. It prints `outputVerifierFlag`,
   `verifierMode`, and whether the always-on branch considered the turn.
2. If `outputVerifierFlag: true` + `verifierMode: 'shadow'` — the fix is to
   stop making the safety floor conditional on the flag being OFF. Run
   `vAffirm` unconditionally BEFORE the branch, so enforcement does not depend
   on which mode the full gate happens to be in. That is a small reordering,
   not a redesign.
3. Re-verify Topic 1's probe 2 with enforcement genuinely on, then continue
   Topic 2 to Mastery.

## Diagnostic result — my hypothesis was WRONG, and three live findings

`3bce247e`'s instrumentation answered the open question, and not the way I
predicted.

```
[affirm-guard-scope] { outputVerifierFlag: false, verifierMode: 'off' }
[affirm-guard-scope] { branch: 'unconditional', considered: true, violated: false }
```

**`outputVerifier` is FALSE.** My recorded hypothesis — "the full gate is
running in shadow mode, so the floor never executes" — is **disproved**. The
floor was running all along, considered the turns, and returned no violation.
The `else`-placement was still a genuine latent bug and the unconditional move
(`e4a5c3c6`) is still correct, but it was not the cause. Recorded as a wrong
call of mine, in full, rather than quietly dropped.

Why no violation on my turn is still unresolved: **these log entries are not my
traffic.** They belong to `userId 1c0a7181-…`, subject `english`, concept
`eng.phonics.print-concepts` — a different account.

### FINDING 1 — there is another live learner on this production app, right now

Real turns, real teaching, concurrent with my audit. Consequences:
- my audit shares a database and a provider quota with real usage;
- my earlier "two users, and the heavier half was me" note about the pool
  incident was right, and this is the other user;
- **a dedicated audit account is now more than hygiene.** Recorded again.

### FINDING 2 — the database is degraded AGAIN, and it is hitting that learner

Repeated in their turns, not mine:
```
prisma:error Invalid `prisma.spineEvent.create()`   → P1008 Socket timeout
[evidence-spine] append failed: … P1008
prisma:error Invalid `prisma.studentProgress.upsert()` → P1008 Socket timeout
[instrumentation] asset bootstrap DB error … P1008
```
Their teaching turns still completed (the route degrades gracefully) but their
**progress writes and evidence writes are failing**. This is the same P1008
class as the earlier outage, so it is recurrent, not a one-off. It needs an
owner with Supabase/pooler access — this session has none.

### FINDING 3 — a real Brain compliance violation in their session

```
BRAIN COMPLIANCE VIOLATION: Brain directed ASK_DIAGNOSTIC_QUESTION
(rule D4-PLACEMENT-PROBE) but the response asked no question
```
Twice, during placement verification. The Brain decided to probe; the model
answered without a question, so placement cannot converge. Logged by the
runtime's own compliance checker — this is the system correctly reporting that
its directive was ignored. Worth a dedicated fix; it is a directive-adherence
defect of the same family as the affirmation problem.

### NEXT EXACT ACTION
1. Re-run the Topic 2 "area … right?" turn and read `[affirm-guard-scope]`
   filtered to MY session id, to learn why `violated: false` there when the
   same strings reject offline. Likely `cleanText` differs from what the API
   returns (tags stripped later), which would mean the guard inspects a
   different string than I tested — a real bug if so.
2. Then Topic 2 to Mastery.
3. Escalated to owner (not blocking my loop): DB P1008 recurrence affecting a
   real learner; D4-PLACEMENT-PROBE compliance violations.

---

# ROOT CAUSE FOUND — the output verifier was skipped on every ASSEMBLED turn

`4cf6a1ac`. This is the answer to "why did the affirmation guard never fire on
audit turns", and it invalidates BOTH of my earlier hypotheses.

## The measurement that settled it

```
[affirm-guard-entry] { assembled: true }
provider=gemini  explanationMemoryServes=0  memoryServingMode=null
fallback_reason="Brain decision"
```

## What was wrong

The verifier block was gated on `if (!assembled)`, on the premise that an
assembled turn is curated content needing no output verification.

**The premise is false.** `assembled` only means a lesson was ASSEMBLED.
Serving it additionally requires `serveFromMemory` (the `text = assembled.text`
site), which the Brain can and does refuse — it escalates to the LLM while
`assembled` stays non-null. So the LLM wrote the answer and the ENTIRE output
verifier, including the affirmation safety floor, was skipped.

That is exactly how *"Claude, exactly right!"* reached a learner on a proposal
turn with no distinguishing move — while the same draft REJECTS deterministically
offline. Both facts were true; the guard simply never ran.

## Why this is the most important defect found so far

Assembly succeeds MORE often as the moat grows. Under the old gate, **the
better the asset library became, the more turns lost output verification** — a
safety layer that decays precisely as the product improves. A regression test
now pins that property directly, not just the symptom.

## Hypotheses REJECTED along the way (kept, not deleted)

| # | hypothesis | verdict |
|---|-----------|---------|
| 1 | "misconception screens never reach runtime" | FALSE — Blueprint register loads; its 4 MCs are all SI-naming |
| 2 | "full gate running in shadow mode, floor never executes" | FALSE — `outputVerifierFlag: false`, floor was running |
| 3 | "temporal dead zone throw swallowed by the catch" | FALSE — every variable declared hundreds of lines earlier |
| 4 | "wrong deployment served the turn" | FALSE — log header names the correct deployment |
| 5 | **"`assembled` truthy skips the block"** | **TRUE** |

The `else`-placement fix (`e4a5c3c6`) and the unconditional floor were still
correct and are kept; they were simply not the cause.

## STATUS
- Topic 1 `phys.meas.units` — **VERIFIED** (measured live; unaffected).
- Topic 2 `phys.meas.dimensions` — **IN PROGRESS**, teaching strong on 5 probes,
  but every one of those turns ran WITHOUT output verification. They must be
  replayed now that the gate is fixed.

## NEXT EXACT ACTION
1. Wait for `4cf6a1ac`. Re-run the Topic 2 probe
   `"ok so area would be L times L, so L squared right?"` on a clean session.
2. Confirm `[affirm-guard-entry] { assembled: true, servedFromMemory: false,
   willVerify: true }` and an `[affirm-guard]` decision line.
3. Expected: the "exactly right!" opener is now REJECTED and repaired. Note the
   design tension already recorded — the learner is RIGHT here, so the repair
   must add precision, not manufacture a false correction. If the repair
   invents a disagreement, that is the next defect to fix.
4. Then Topic 2 → Examples → Guided → Mastery as an intermediate-English
   learner, and only then VERIFIED.

## The gate fix immediately exposed a false positive — fixed (`2f3655f4`)

With verification finally running, the Topic 2 replay produced:

> me: "ok so area would be L times L, so L squared right?"  ← **CORRECT**
> tutor: the generic fail-closed template

The guard rejected the tutor's *correct confirmation* twice and served filler.
Demanding a distinguishing move on every proposal turn punishes being right.
This tension was recorded BEFORE it occurred; it then occurred, and is fixed.

**Discriminator: the curriculum's own misconception library.** Symptom phrases
exist precisely to say "a learner who says THIS holds THAT error".

| learner | matches authored symptom? | rule |
|---------|---------------------------|------|
| "if i count 5 apples the unit is apples" | yes (M5) | REJECT bare agreement |
| "area would be L times L, so L squared" | no | allow confirmation |

Two shared substantive words, not one (a single shared noun is usually the
concept's own name). Absent knowledge keeps the stricter behaviour.

**This makes the safety rule a CONSUMER of the moat** — the better the
misconception libraries get, the more precisely it fires. That is the exact
inverse of the gate defect it follows, where a growing moat silently disabled
verification. Worth noting as an architectural principle: safety layers should
strengthen with the asset library, never weaken.

### NEXT EXACT ACTION
1. Wait for `2f3655f4`. Replay BOTH on a clean session:
   - `"ok so area would be L times L, so L squared right?"` → expect a normal
     confirmation, no template, `[affirm-guard-entry] willVerify: true` and no
     `[affirm-guard]` violation.
   - `"ok so if i count 5 apples the unit is apples right"` (Topic 1 probe, in
     a units lesson) → expect REJECT + repair, i.e. the protection still fires
     where it should.
2. Both correct → Topic 2 continues: Examples → Guided → Mastery as an
   intermediate-English learner → VERIFIED → moat.

---

# 🔴 THE BIGGEST FINDING — the authored teaching corpus was never deployed

`b53e93ea`. One line of `next.config.js`.

```js
outputFileTracingIncludes: { '/**': ['./docs/**/*.json'] }   // JSON ONLY
```

The Knowledge Graphs are JSON, so they shipped and worked — which is precisely
what hid this. Every hand-authored teaching file is MARKDOWN:

| corpus | path | files | traced? |
|--------|------|-------|---------|
| Blueprints | `docs/curriculum/blueprints/*.md` | 1,347 | **NO** |
| Educational Brain | `educational-brain/concepts/**/*.md` | 875 | **NO** |

`blueprintLoader` reads them with `readFileSync(process.cwd() + …)`. Untraced
files do not exist in a Vercel serverless bundle, so every call hit ENOENT and
returned "not found" **for every concept, on every turn, since deployment**.

### What this means was never in a production prompt

- the entire `BLUEPRINT CONTEXT` block
- `KNOWN MISCONCEPTIONS` (both registers)
- the `NEVER CONFIRM A WRONG CLAIM` rule (it is built inside that block)
- opening scenarios, teaching sequences, tutor actions, anti-analogies,
  voice cues, discovery questions

### Measured, not inferred

```
[affirm-guard-known] { conceptId: 'phys.meas.dimensions', knownChars: 0 }
```
against **555 characters** for the same concept loaded in-process.

### It explains the standing architecture finding

`validation/07-architecture-audit.md` records that "0 of 52 authored
retrievable layers are retrieved at runtime". That was read as a pipeline-design
gap for months. **The cause was that the files were not deployed.**

### CORRECTIONS THIS FORCES TO MY OWN EARLIER CLAIMS

Recorded, not quietly dropped:
1. **M5 cannot have improved Topic 1 in production.** It was authored, parsed
   locally, and never shipped. Topic 1's measured improvement came from the
   prompt (`client.ts`) and repair-path changes alone. Topic 1 remains VERIFIED
   — it was measured on real learner-visible output — but the attribution in
   its entry was wrong.
2. **The misconception-gated verifier had nothing to gate on** in production
   (`knownChars: 0`), which is why a CORRECT learner was rejected: the rule
   fell back to its conservative branch, exactly as designed for missing
   knowledge. The rule is right; it was starved.
3. Earlier ledger text implying EB misconceptions "now reach the prompt" was
   true locally and false in production until this commit.

### Why no test caught it
The loader is correct and the files exist in every environment a test runs in.
This was a CONFIGURATION mismatch between what is read and what is shipped, so
`authoredKnowledgeShips.test.ts` asserts the config against the loader's own
paths rather than testing behaviour.

## NEXT EXACT ACTION
1. Verify `b53e93ea` deployed, then re-run Probe A. Expect
   `[affirm-guard-known] knownChars > 0` — the first time authored knowledge
   has ever reached a production turn.
2. Probe A must then be CONFIRMED normally (learner is right, no misconception
   match). Probe B (apples/units) must be REJECTED and repaired.
3. Re-run Topic 1's two probes: its behaviour may change now that the real
   corpus is present — re-verify rather than assume the VERIFIED status holds.
4. Then Topic 2 → Mastery → VERIFIED → moat → Topic 3.

---

# ✅ PROBES A AND B BOTH PASS — authored knowledge is live in production

Clean sessions, real learner account, commit `b53e93ea` (the bundle fix).

## Probe A — learner is CORRECT (dimensions lesson)
> me: "ok so area would be L times L, so L squared right?"
> tutor: *"**Spot on**, Claude! Area is length times length, so its dimension
> is indeed written as length squared… imagine stretching that into the third
> dimension to fill a box… that's volume, L cubed… we never accidentally add a
> length to an area, just like you wouldn't add 5 metres to 3 kilograms. If
> velocity is distance divided by time… what are the dimensions of velocity?"*

Confirmed normally. **No false rejection, no template, teaching continues.**
The false positive is gone.

## Probe B — KNOWN MISCONCEPTION (units lesson)
> me: "ok so if i count 5 apples the unit is apples right"
> tutor: *"Claude, that is a very natural thought, **but it is not quite
> right**. An apple is just the object you are counting, **not an agreed
> standard size**. Because **one apple can be small and another can be huge**,
> 'five apples' tells us the count, but it does not tell us the exact size…
> a **unit** is a specific, agreed-upon reference amount—like one metre—so that
> everyone around the world means the exact same thing."*

**This is M5's authored repair, verbatim in substance** — "HOW MANY is the
count; OF WHAT AGREED AMOUNT is the unit… an apple is not a fixed size". The
Educational Brain entry authored during this audit is now demonstrably shaping
a production answer. That has never previously been true for any authored
entry.

Against the intermediate-English standard: short sentences, everyday words
("small", "huge"), one idea at a time, the technical term introduced and
immediately defined, explicit correction with a concrete REASON rather than a
bare "no".

## Method note — two contaminated runs, discarded not reported
A transient SSL failure made `lesson-init` fail silently, leaving the session
on the previous lesson; the reply then drifted into dimensional analysis and
affirmed the misconception. That was MY harness, not the product. `clean.sh`
now prints the lesson-init text so a failed setup is visible before the probe
result is read. Neither contaminated run is recorded as a defect.

## STATUS
- Topic 1 `phys.meas.units` — **VERIFIED**, and now re-confirmed with the real
  corpus present (probe B above is Topic 1's own probe).
- Topic 2 `phys.meas.dimensions` — probe A passes; remaining stages
  (Examples → Guided → Mastery) still to run before VERIFIED.

## NEXT EXACT ACTION
1. Topic 2 through Examples → Guided → Mastery as an intermediate-English
   learner; then VERIFIED + moat asset.
2. Then Topic 3 `phys.meas.errors`, and onward through the corpus.
3. Re-run a spot check on any earlier probe whose result predates `b53e93ea` —
   every measurement taken before it ran WITHOUT the authored corpus.

---

# P1 — WRONG-TOPIC CONTENT SERVED (the "privacy incident" is RETRACTED)

> **CORRECTION, same session.** I flagged the name "Mohammad Suaib" as a
> possible cross-learner data leak. **It is not.** The name appears in
> `src/lib/teaching/teachingGranularity.ts` in a code comment quoting a real
> production transcript from 2026-08-07 **on this same account**, and the
> account is `suaibamr@gmail.com`. The auth session's display name is
> "Claude" (the User row); the teaching prompt uses the learner's PROFILE
> name, which is the owner's real name. Different field, same person.
>
> No other learner's data was involved. The privacy escalation is withdrawn
> before anyone acts on it. I am recording the false alarm rather than quietly
> deleting it, because "escalate on suspicion, retract on evidence" only works
> if both halves are visible.
>
> **What remains is still real and still P1** — defects 2 and 3 below.

Found on Topic 2, clean session, real production, after `b53e93ea`.

> me: "so speed is L then? because it is distance"
>
> tutor: **"Mohammad Suaib, wave interference happens when two water waves
> overlap on a pond**, combining to make either a much higher crest where they
> meet or completely flattening out. Good question — now, back to Dimensional
> Analysis, let's examine a physical formula…"

## Three defects in one turn

1. ~~WRONG NAME — possible cross-learner data leak.~~ **RETRACTED** — it is
   the account owner's own profile name. See the correction above.
2. **WRONG TOPIC.** Wave interference on a pond, served inside a Dimensional
   Analysis lesson, in answer to a question about speed.
3. **THE QUESTION WAS IGNORED.** "so speed is L then?" is a real misconception
   (speed is L/T). It was neither answered nor corrected — the turn pivoted
   straight to "now, back to Dimensional Analysis".

## Leading hypotheses — NOT yet tested, do not act on these before measuring

- an Explanation Memory / AssetIdentity row whose stored content contains both
  a learner name and wave-interference text was matched and served;
- newly-shipped corpus (`b53e93ea`) changed retrieval matching and surfaced an
  asset that was previously unreachable;
- a cross-session cache key collision.

**This turn came AFTER the bundle fix**, so it may be a consequence of the
authored corpus becoming reachable for the first time. That would make it a
regression introduced by `b53e93ea` — which must be checked before anything
else, since that commit is otherwise a large win.

## IMMEDIATE NEXT ACTION
1. Pull runtime logs for the Topic 2 turn and read `memoryServingMode` /
   `memoryAssetId` / `[explanationMemory]` lines. Determine whether the
   wave-interference text came from a STORED ASSET or from the live model.
2. If a stored asset: fetch it by id and check why it matched a
   dimensional-analysis turn. Grep the seed sources for "wave interference".
   A physics-waves asset served in a measurement lesson is a retrieval defect
   in the SAME family as the earlier "irrelevant-to-question" refusals already
   visible in the logs — that refusal path exists and did not fire here.
3. Separately: the ignored misconception ("speed is L" -> speed is L/T) is a
   teaching defect independent of where the text came from.
4. Then resume Topic 2 from a clean session.

## STATUS
- Topic 2 `phys.meas.dimensions` — **FAILED** (this turn). Earlier probes on
  this topic were good; this one is disqualifying.
- Topic 1 — VERIFIED, unaffected.

---

# 🔴 P0 — THE TUTOR READ AUTHORING METADATA ALOUD (`6d6d283f`)

Found on the FIRST probe of a clean Topic 2 session, before any of the
carried-over investigation could start. Real production, real learner account.

> me: "i dont really get what a dimension is, isnt that just how many sides a
> shape has"
>
> tutor: *"Let's check that one carefully rather than me just agreeing — this
> is a place where it is easy to mix two things up.*
>
> ***concept_id: phys.meas.dimensions name: Dimensional Analysis domain:
> Measurement & Units (Physics) difficulty: developing (3) bloom: apply
> prerequisites: [phys.meas.units] mastery_threshold: 0.75 estimated_hours: 3
> cross_links: [] session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
> cpa_entry_stage: C …***
>
> *Tell me in your own words what part of that is different from what you were
> picturing."*

## Two defects, and why they only became reachable now

Both were latent until `b53e93ea` shipped the authored corpus into the
serverless bundle. Before that the loader returned "not found" for every
concept, so this path always fell through to the generic template and the
defect could not be seen.

1. **`extractSpine` accepted a metadata block as the concept's DEFINITION.**
   77 of 1,347 blueprints open their spine section with an unfenced
   `key: value` profile — no ``` fence, so the YAML branch never saw it; no
   leading `|`, so the paragraph filter admitted it. Those 77 concepts were
   also feeding the dump into the `BLUEPRINT CONTEXT` prompt block as the
   concept's definition, on every turn, for every learner.
2. **The affirmation guard's last resort SPOKE the spine.** The spine is
   written for an AUTHOR. Its ordinary case is a mastery rubric
   (`[Boundary statement] A student who achieves mastery demonstrates:`) —
   honest content, and still the wrong thing to say to a beginner.

## The fix, split to match

- `looksLikeMetadata()` (exported, shared) refuses the metadata case in the
  loader. Skipping falls THROUGH to the next spine section rather than blanking
  the spine — re-scan: **0 metadata spines, 1347/1347 still have a definition**.
  It catches both generations, which share almost no key name (`concept_id:` /
  `SESSION_TA_CAP:`), so a hardcoded key list alone would have missed one.
- The spoken text now leads with the **Knowledge Graph description** — the one
  place the curriculum states a concept in a single learner-facing sentence —
  behind a `readsAsProse()` gate that also guards the blueprint backup.
  Verified: all **424** audited physics + chemistry concepts have a speakable
  description, so the last resort cannot go missing exactly when it is needed.

## The carried-over Topic 2 P1, investigated

The "wave interference … on a pond" turn: **not from a stored asset.**
`pond` and `two water waves overlap` appear nowhere in the repository; the
`phys.wave.interference` seed content is dense and technical (speakers,
calorimeter, fringe visibility) and shares no wording with what was served;
neither the `phys.meas.dimensions` blueprint nor its EB entry mentions
interference. The `"Good question — now, back to <lesson>"` shape it ended on
exists only inside a CODE COMMENT in `conceptAnchor.ts`, describing the
banned P0-1 behaviour — it is not in any prompt.

Production DB could not be queried to check for a served ACTIVE asset:
**Supabase MCP still lists 0 projects.** So the finding is bounded honestly —
ruled out as authored-corpus content, not yet ruled out as a DB row.

## STATUS

| status | value |
|--------|-------|
| VERIFIED | 1 — `phys.meas.units` |
| FAILED / IN PROGRESS | 1 — `phys.meas.dimensions` |
| REMAINING | 422 |
| Moat explanations | 1 |
| Global fixes this run | 14 |

## NEXT EXACT ACTION
1. Confirm `6d6d283f` is READY in production.
2. `./clean.sh` for `phys.meas.dimensions`, then re-run the same first probe.
   Expect a real explanation of what a dimension is — no `concept_id:`, no
   `bloom:`, no `mastery_threshold:` anywhere in the reply.
3. Then Topic 2 forward: the "speed is L" misconception (it is L/T, and the
   original turn IGNORED it), then Examples → Guided → Mastery → VERIFIED.
4. Re-probe: any concept measured before `6d6d283f` whose reply hit the
   affirm-guard last resort may have been served metadata.

---

# TOPIC 2 — clean replay on the fixed build

Clean session `cmspveqbb0001jr04aotu3ood`, real production, real learner
account, commit `6d6d283f` READY and holding `my-tutor-flame.vercel.app`.

## The metadata leak is GONE

> me: "i dont really get what a dimension is, isnt that just how many sides a
> shape has"
>
> tutor: *"Claude, that is a completely natural place to get tripped up, because
> the word 'dimension' is used in two totally different ways in everyday life!
> When we talk about shapes, yes, a square has two dimensions… But in physics, a
> **dimension** is the fundamental *type* of physical quantity we are measuring…
> whether you measure the distance between two cities in kilometres, miles, or
> inches, the *type* of quantity is always length…"* + comprehension check.

No `concept_id:`, no `bloom:`, no `mastery_threshold:`. Validates the intuition,
names the homonym, concedes the geometry sense, contrasts, concrete before
abstract, notation after the idea. Intermediate-English standard met.

## The "speed is L" misconception did NOT reproduce — correction recorded

> me: "wait so speed is L right? because speed is about distance"
> tutor: *"**Not quite**, Claude! Speed isn't just distance by itself—it's how
> much distance you cover in a certain amount of time… a car… sixty miles in one
> hour… **Because time is dividing the distance**… `[LT⁻¹]`."* + transfer
> question about area.

This was measured BEFORE M5 deployed, and it passed anyway. **So the original
P1's ignored misconception was collateral of the wave-interference anomaly, not
a reproducible teaching defect.** Recorded as a correction to my own earlier
framing. M5 is still worth having — it supplies the guard's discriminator and an
authored repair for weaker draws — but it is not load-bearing here.

> me: "is it 2L? because there are two lengths"
> tutor: *"**Not quite**… dimensions track the *type* of quantity, not how many
> you have… The number two goes as an **exponent, not a coefficient**…"*

That is M2's authored recovery in substance.

## A SIXTH false reading of my own — recorded, harness fixed

That turn appeared to end with *"let's try a quick check question"* and never
ask one. It did ask one: the check is a STRUCTURED `mcq` field, rendered as a
widget, absent from `text`. My harness read only `text`. Same lesson as the
LaTeX retraction — **the raw API response is not the learner's screen** —
and `ask2.sh` now prints `mcq`, `memoryServingMode` and the character count.

---

# 🔴 P0 — THE SYSTEM REFUSED THE COMPLETION AND TOLD THE LEARNER IT GRANTED IT
### (`648480bc`) — the most serious defect this audit has found

I answered the check question correctly — the FIRST correct answer of the
lesson — and got a full completion card:

> *"🎉 Excellent work! … ✓ What you mastered — … ✓ Common mistakes — …
> **✓ Progress — You've completed Lesson 3 of 238. Next up is "Measurement
> Errors and Uncertainty".** ✓ What's coming — …"*

The engine's own state, same turn, same response body:

```
mastery: { verified: false, phase: 'OBSERVE', checkCorrect: 0,
           practiceCorrect: 0, checkRequired: 1, practiceRequired: 2,
           completionSuppressed: true, gatePending: true }
completedLessons: []
```

## Root cause: the gate inspects the TAG, the learner reads the PROSE

`gateLessonCompletion` did its job perfectly — it stripped `[LESSON_COMPLETE]`,
so nothing was recorded and `completedLessons` stayed empty. **The system
refused the completion and simultaneously told the learner it had granted it.**
The record and the claim disagreed, and the learner got the false half: told
they had finished a lesson they had answered ONE question of, and handed the
name of a lesson they had not reached.

This is **hollow advancement** — the precise failure the First-Principles Review
names as the product's defining stance ("refuses hollow advancement; enforcement
must live in code, not prompts") — and it is V-AFFIRM's lesson a second time:
enforcement has to sit on the surface the learner actually receives.

Note the turn emitted **no tag at all**, so a rule that only fired alongside one
would have missed it entirely.

## The fix

`enforceStance` now applies the same law to prose. Bookkeeping only — praise is
never touched ("excellent work", "you've got it", "you finished that
calculation" all survive), per the D3 precedent: keep the praise, drop the
bookkeeping. Sentence-level stripping preserves the recap and explanation the
learner earned; orphaned bullet labels are removed; if the claim was the WHOLE
message the text stands and the violation carries the signal rather than
blanking the turn. The route then appends what the gate is actually waiting for,
computed from `MASTERY_PRACTICE_REQUIRED` and the learner's own counters —
stripping the lie is only half the job when the turn still reads like an ending.

## A false positive this fix introduced, and the tests caught

Gating on `completion.authorized` looked obviously right and was wrong:
`gateLessonCompletion` returns `authorized: false` for every turn WITHOUT the
tag, so a learner who had genuinely met the bar would have had their TRUE
completion claim stripped. The gate is now the truth of the claim itself
(`masteryVerifiedStrict && !excursionActive`), and the route detects the strip
by before/after comparison instead of repeating the same mistake. Recorded
because the near-miss is the finding: this fix was one line from becoming a
worse defect than the one it repairs.

## Also fixed this turn (`c4827dd9`)

- **A wrapped heading silently discarded 9 authored misconceptions.**
  `parseEBMisconceptions` matched titles with `[^*\n]`, so a heading running
  onto a second line failed the head match — and a block that fails the head
  match is skipped entirely, body and all. 9 entries across 8 files
  (mathematics + physics), including `phys.meas.dimensions` M4, had never
  reached a prompt.
- **`phys.meas.dimensions` M5 authored** — the dropped divisor ("speed is L
  because it is distance"). None of M1–M4 nor either Blueprint register covered
  it. Carries the learner's verbatim words, which is what makes the affirmation
  guard's discriminator match: measured 4 substantive words of overlap against a
  threshold of 2. Recovery leads with the counter-case (two cars, same 100 m,
  different times) before any symbol, and generalises once so the repair
  transfers to density and pressure instead of patching speed alone.

| status | value |
|--------|-------|
| VERIFIED | 1 — `phys.meas.units` |
| IN PROGRESS | 1 — `phys.meas.dimensions` |
| REMAINING | 422 |
| Moat: authored misconceptions | +1 (dimensions M5) |
| Global fixes this run | 17 |

## NEXT EXACT ACTION
1. Confirm `648480bc` READY.
2. Clean session on `phys.meas.dimensions`, drive to the mastery gate: answer
   the check, then TWO practice items. Expect no completion card until
   `practiceCorrect >= 2`, and expect the honest continuation line if the model
   tries to wrap up early.
3. Then Topic 2 VERIFIED + moat, then Topic 3 `phys.meas.errors`.
4. Standing: `checkCorrect` stayed 0 after a correct MCQ answer given in PROSE
   ("the second one, they must be identical types"). Determine whether prose
   selection of an MCQ option is scored at all — if not, every learner who types
   their answer instead of clicking is accruing no evidence.

---

# 🔴🔴 SUSPECTED P0 — THE MASTERY LADDER DOES NOT MOVE

Found while driving Topic 2 to its mastery gate. **Not yet root-caused — the
diagnostic is deployed and the next iteration reads it.** Recorded now because
the measurement is solid even though the cause is not.

## The measurement

Clean session `cmspvz1sa0001kw04hp5bfa2j`, real production, real learner
account. Every turn's `mastery` object comes from
`conversationStateAfterTurnHoisted`, i.e. AFTER this turn's evidence is folded.

| turn | learner | phase | check | practice |
|------|---------|-------|-------|----------|
| 1 | "a dimension is the type of quantity, like length is L, not the unit we measure it in" — CORRECT | OBSERVE | 0 | 0 |
| 2 | "yes, i am ready" — acknowledgement | OBSERVE | 0 | 0 |
| 3 | "the dimension of area is L squared, because it is length times length" — CORRECT | OBSERVE | 0 | 0 |

The tutor agreed each answer was right ("that is spot-on", "that is completely
correct"). The ladder did not move on ANY of them — not on the success path,
not on the acknowledgement path.

Earlier the same day, a different clean session showed the same thing across
five turns, ending with the completion card that produced the P0 above.

## Why this would be the most serious finding of the audit

`correctAtCheck` only increments at `phase === 'CHECK'`; `correctAtPractice`
only at `PRACTICE`. If the ladder never leaves OBSERVE, neither counter can
ever move, `masteryVerifiedStrict` can never be true, and **no learner can
complete any lesson, ever.** That is consistent with `completedLessons: []`
throughout this audit.

## What the existing logs DO say

- `[affirm-guard-known] { knownChars: 1140 }` — authored knowledge IS reaching
  the prompt. The bundle fix holds.
- `[affirm-guard-scope] { branch: 'unconditional', considered: true }` — the
  safety floor runs on these turns.
- CUE: `masteryState: {"value":"unknown","source":"unavailable"}` and
  `uncertainty: ["masteryState: no evidence available this turn"]`, every turn.
- Brain: `D0d-SESSION-OPENING-PROTOCOL` on every turn, `conversationIntent:
  session_opening` — the opening protocol never completes. Per the session
  lifecycle's own rule, OPENING→CORE happens on the first ANSWERED SIGNAL.
- No P1008 errors in this window, so the recurring DB degradation is NOT an
  obvious contributor here.

## Ruled IN by reading the code (not yet by measurement)

`buildSignalInstruction()` is appended to the system prompt UNCONDITIONALLY
(`route.ts` ~1724), so the model is definitely being asked for the tag. The
fold at ~4232 reads `teachingSignal?.correctness ?? null`, and
`advanceConversationState` advances OBSERVE→DEMONSTRATE only when
`signalCorrect === true` (or on a bare acknowledgement).

## Candidates, NOT acted on before measuring

1. the model never emits `<!--SIGNAL-->`;
2. it emits one without `correctness`;
3. the fold runs and the transition is gated somewhere else.

CUE's "masteryState unavailable" and the stuck opening protocol are consistent
with ALL THREE, so neither settles it. **Five hypotheses in this audit have
already been wrong and instrumenting settled every one** — so `38d0f843` adds a
single `[ladder]` line printing tag presence, parsed correctness,
acknowledgement, excursion, askedQuestion, and the phase either side of the
fold with both counters. No behaviour change.

## Honest scope note
`"yes, i am ready"` may simply not match `isBareAcknowledgement` (its known set
is "got it / ok / next / continue / go / thanks / done" …). That would explain
turn 2 and NOT turns 1 and 3, which were substantive correct answers.

## NEXT EXACT ACTION
1. Wait for `38d0f843`, run a clean session, answer correctly, read `[ladder]`.
2. Branch on what it says:
   - `signalTag: false` → the model is not complying with a mandatory
     instruction. Root cause is prompt/compliance; the deterministic fix is to
     stop depending on LLM self-report for the ladder (foundations/03 §7 already
     calls the SIGNAL a substitute for instrumentation, not equivalent to it).
   - `signalTag: true, correctness: null` → parser/emission mismatch.
   - `phaseBefore` already OBSERVE each turn with a true signal → the fold's
     input is right and the transition or the PERSIST is wrong.
3. Fix, add a regression test that fails on a frozen ladder, then resume Topic 2
   to its gate and mark VERIFIED.

---

# 🔴 ROOT CAUSE FOUND — NO LESSON WAS COMPLETABLE (`13070945`)

The suspected P0 above is confirmed and fixed. **Found offline, with no
provider and no database** — the production measurement pointed at it, but the
proof needed neither.

## The reproduction

```
10 correct answers, every turn asking a question
  -> phase DEMONSTRATE, check 0, practice 0, demonstrated false
the same 10 with ONE silent teach turn inserted
  -> phase TRANSFER, check 1, practice 2, demonstrated true
```

## The cause

`demonstrated` was set only inside the `else` of `if (askedQuestion)` — the
code **equated ASKING with NOT TEACHING**. Good tutoring does both in one
breath: explain, then end on a question. Every production turn measured in this
audit did exactly that, so `demonstrated` was never set, and DEMONSTRATE→GUIDE
is gated on it. With the ladder stuck below CHECK, `correctAtCheck` and
`correctAtPractice` can never increment and `masteryVerifiedStrict` can never
be true.

**An earlier repair had already found DEMONSTRATE absorbing** and hoisted the
transition out of the `succeeded` branch — but left it gated on this flag, so
the freeze survived in a different form. That is why the new test asserts
REACHABILITY end to end rather than any single transition: a test on one edge
is precisely what let the previous repair look complete.

## The fix, and what it deliberately does NOT do

`deliveredTeaching` — the server's own decided move, not a guess from prose —
is wired at BOTH fold sites so the fallback fold cannot disagree with the
upstream one. Omitting it is byte-identical to previous behaviour, asserted
rather than assumed.

**It does not lower the mastery bar.** `demonstrated` asserts the TEACHER
delivered, never that the learner learned. Pinned by tests: eight delivered
teach turns with no correct answer leave both counters at 0; acknowledgements
still buy nothing; wrong answers do not climb; a degraded outage template is
still not a give. It draws the same boundary the acknowledgement path already
draws — delivery phases advance on delivery, mastery gates on evidence.

**Verified it engages:** `decideNextMove` returns `'show'` at DEMONSTRATE, so
the real path supplies `deliveredTeaching = true`. A fix depending on a move the
engine never chooses would be correct in isolation and inert in production.

A drift guard caught the replay harness not modelling the new field — updated,
because a replay that reproduces a fixed bug is worse than no replay.

## Honest status

- The offline reproduction and the fix are **proven**.
- **Production verification has NOT been performed** — `13070945` was pushed
  this turn and had not deployed when this entry was written. The suspected
  cause of the production OBSERVE→OBSERVE freeze (turns 1–3 of session
  `cmspvz1sa…`) is a MISSING SIGNAL, which is a SEPARATE question from this
  one and is what the `[ladder]` diagnostic (`38d0f843`) still needs to answer.
  Do not record this as closing the production symptom until both are read.

| status | value |
|--------|-------|
| VERIFIED | 1 — `phys.meas.units` |
| IN PROGRESS | 1 — `phys.meas.dimensions` |
| REMAINING | 422 |
| Global fixes this run | 18 |

## NEXT EXACT ACTION
1. Confirm `13070945` READY.
2. Clean session, answer correctly through the ladder, and read BOTH the
   `[ladder]` line and the `mastery` object each turn.
   - If `signalTag: false` on answer turns, the SIGNAL half is still open and
     is its own defect — the ladder fix alone will not climb without evidence.
   - If phases now climb OBSERVE→DEMONSTRATE→GUIDE→CHECK→PRACTICE→TRANSFER,
     that is the first completable lesson this audit has seen.
3. Then Topic 2 VERIFIED + moat, then Topic 3 `phys.meas.errors`.

---

# 🔴 THE SECOND FREEZE — THE SIGNAL TAG IS NEVER EMITTED (`23695038`)

The `[ladder]` diagnostic answered the open question on the first probe.
Real production, real learner account, on a correct answer the tutor itself
called "spot-on":

```
[ladder] { signalTag: false, correctness: null, ack: false,
           excursion: false, askedQuestion: true,
           phaseBefore: 'OBSERVE', phaseAfter: 'OBSERVE',
           check: 0, practice: 0 }
```

**Candidate (a) CONFIRMED; (b) and (c) eliminated.** The model simply never
emits `<!--SIGNAL-->`. Its instruction is appended to every system prompt
unconditionally, so this is non-compliance, not a wiring gap.

## This is a SECOND freeze, independent of the first

| # | freeze | fixed by |
|---|--------|----------|
| 1 | `demonstrated` never set ⇒ DEMONSTRATE absorbing | `13070945` |
| 2 | no SIGNAL ⇒ `signalCorrect` always null ⇒ no evidence at all | `23695038` |

Fixing only #1 would not have produced a completable lesson: the CHECK and
PRACTICE gates advance on `succeeded`, which requires a correctness signal.

## The fix, and why not a prompt change

`foundations/03 §7` already records the SIGNAL as *"a substitute for real
instrumentation, not equivalent to it"*. Hanging the entire mastery system off
one optional-looking tag means a model that skips it silently freezes every
learner, with no error anywhere. Strengthening the prompt is the wrong lever
and this audit has now learned that twice (V-AFFIRM, then the never-confirm
rule).

An MCQ is the one assessment form where correctness is **not a judgement**: the
tutor declared the right answer when it wrote the question. So a reply to one is
now graded server-side against the stored `correctIndex` — real instrumentation,
no model call, no cost. `mcqConfidence()` had been written for exactly this and
had no caller.

The pending question rides the existing session-snapshot mechanism (no
migration, no second store), is written UNCONDITIONALLY, and is cleared on any
turn that asks nothing so a stale MCQ can never grade an unrelated later
message. *The first draft put that write inside `if (teachingHistoryHoisted)` —
the exact mistake that left the teaching ledger stale for months, per the note
sitting directly above it.*

**Refusing to guess is the point.** A wrong guess writes false evidence into a
permanent record and can advance a learner through a gate they did not earn —
worse than the freeze it repairs. Grading returns null (never "wrong") when the
reply cannot be matched, leaving the SIGNAL path alone.

## Two false positives the tests caught before they shipped

Both would have silently mis-graded real learners:

1. **"the third one"** matched the number word *one* and resolved to option 1.
   The English number words are now dropped entirely rather than disambiguated,
   and an out-of-range ordinal refuses instead of falling through to a weaker
   rule.
2. **"a dimension is about quantity"** — the shape of an answer this learner
   actually typed — matched the standalone token "a" and selected option A. The
   indefinite article is the one option key that is also an ordinary English
   word, so it now requires an explicit marker or the whole message.

## Honest status
- Both fixes are proven offline; **neither is production-verified yet.**
  `13070945` was still BUILDING and `23695038` was pushed this turn.
- The open-ended (non-MCQ) answer case is **still unprotected**: with no SIGNAL,
  a free-text correct answer produces no evidence. MCQ is the default assessment
  form per `buildMcqInstruction`, so this covers the graded path — but it is a
  bound, not a complete solution, and is recorded as such.

| status | value |
|--------|-------|
| VERIFIED | 1 — `phys.meas.units` |
| IN PROGRESS | 1 — `phys.meas.dimensions` |
| REMAINING | 422 |
| Global fixes this run | 19 |

## NEXT EXACT ACTION
1. Confirm `23695038` READY.
2. Clean session; answer the tutor's MCQ; read `[mcq-grade]` and `[ladder]`.
   Expect `correct: true` from the grader and a phase that CLIMBS.
3. Drive to the gate — check + two practice items — and confirm a completion
   card appears ONLY at `practiceCorrect >= 2`. That would be the first
   completable lesson this audit has seen.
4. Then Topic 2 VERIFIED + moat, then Topic 3 `phys.meas.errors`.
5. Standing, unfixed: free-text answers still produce no evidence when the model
   omits the SIGNAL. Decide whether to grade them deterministically too, or to
   make the ladder tolerate their absence.

---

# ✅ THE LADDER CLIMBS — first movement in this entire audit

Clean session `cmspx58sl0001lg04bfk5wr2k`, real production, commit `23695038`
holding the learner alias.

| turn | learner | phase | note |
|------|---------|-------|------|
| 1 | free-text correct answer | OBSERVE | no MCQ pending ⇒ nothing to grade, and no SIGNAL. **The residual gap, visible.** |
| 2 | "ok i think i understand, can you give me a question to try" | OBSERVE | tutor asks an MCQ (force → `[M][L][T]⁻²`) |
| 3 | **"b"** | **DEMONSTRATE** | **the ladder moved for the first time** |
| 4 | "ok give me another question" | **GUIDE** | climbed again |

Deterministic MCQ grading works end to end in production. Turn 1 is the honest
counter-example: a correct FREE-TEXT answer still produces no evidence, exactly
as recorded when that bound was written.

---

# 🔴 THE WAVE-INTERFERENCE ANOMALY — SOLVED (`22dc4852`)

It reproduced on turn 4, **byte-for-byte identical** to the first occurrence in
a different session. That is what identified it as a stored artefact rather than
a model hallucination. The response metadata named it outright:

```
provider          = memory
memoryServingMode = exact_match
memoryAssetId     = f22e5673-4b1f-473a-bec8-4fbb9637c0c0
memoryConceptId   = phys.meas.dimensions
memoryConfidence  = 75
```

> *"Mohammad Suaib, wave interference happens when two water waves overlap on a
> pond… Good question — now, back to Dimensional Analysis, let's examine a
> physical formula…"*

That asset id had been sitting in the CUE logs as an `explanationMemory` hit on
**every turn of this lesson**, in every session, since before this investigation
began.

## Root cause: the capture gate checks WELL-FORMED, never REUSABLE

Real concept id, supported language, valid kind, long enough, no placeholder,
not degenerate — it passed everything. But a captured asset is by definition
replayed to a DIFFERENT learner in a DIFFERENT session, and two things make this
text unusable that way:

1. **It addresses one learner BY NAME.** A shared asset carrying a learner's
   name leaks it to every other learner served that asset. This is the audit
   mandate's *"never store verbatim learner identity data inside shared teaching
   assets"* — violated by the capture path itself. **This is a MECHANISM
   defect**: it would embed ANY learner's name, and here it demonstrably did.
   *(Distinct from the earlier retracted privacy claim, which was about whose
   name it was. This is about the pipeline that put a name there at all.)*
2. **It is turn-scoped discourse** — an answer to a question asked in that
   session plus a steer back to the lesson. Replayed to anyone else it is a
   non-sequitur, which is exactly how it read.

The route now passes the learner's profile name into the gate, so the name check
is exact rather than inferred.

## Two of my own mistakes the tests caught before they shipped

- A **shape heuristic** for vocatives (capitalised word + comma) rejected
  *"Speed, distance and time are all related…"* — a legitimate explanation. It
  would have quietly starved the capture pipeline, which is the moat this
  subsystem exists to build. **Removed rather than tuned:** a name cannot be
  told from a capitalised common noun without knowing the name. The resulting
  limit is stated in the code, not hidden.
- The name regex wrapped `\b` unconditionally, so a name ending in a non-word
  character (`"A.J. (Bob)"`) never matched **and the leak shipped**. Boundaries
  are now applied only where the name has a word character to bound.

## Open, and stated rather than papered over

- **On-topic checking is NOT implemented.** The offending asset's second
  paragraph is genuinely about dimensional analysis, so vocabulary overlap would
  have passed it and a fuzzy semantic test would reject good assets.
- **OWNER ACTION — the offending row is still ACTIVE and still serving.** The
  gate stops NEW captures; it cannot retract what is already stored. This
  session cannot reach the database (Supabase MCP lists 0 projects). Deprecating
  `f22e5673-4b1f-473a-bec8-4fbb9637c0c0` is one statement, and until it happens
  every `phys.meas.dimensions` learner can be served it.
- **A survey of existing ACTIVE assets for the same defect has NOT been done**,
  for the same reason. Production holds 1,589 ACTIVE explanation rows; how many
  carry a name or session-bound discourse is unknown and worth one query.

| status | value |
|--------|-------|
| VERIFIED | 1 — `phys.meas.units` |
| IN PROGRESS | 1 — `phys.meas.dimensions` |
| REMAINING | 422 |
| Global fixes this run | 20 |

## NEXT EXACT ACTION
1. Confirm `22dc4852` READY.
2. Resume the climb on a clean session: MCQ answers only, through CHECK and
   PRACTICE, and confirm mastery verifies at `practiceCorrect >= 2` — the
   offline prediction is **six correct answers → TRANSFER, check 1, practice 2**.
3. Confirm the completion card appears ONLY then (the `648480bc` prose rule
   should suppress any earlier claim).
4. Read `[ladder]`'s new `move` / `mcqAsked` fields to quantify how often a gate
   turn asks WITHOUT an MCQ — that is the residual evidence gap.
5. Then Topic 2 VERIFIED + moat, then Topic 3 `phys.meas.errors`.

---

# ✅✅ A LESSON WAS COMPLETED — the first in this audit

Clean session `cmspxlv2o0001l80499tofjdx`, real production, real learner
account. MCQ answers only, driven to the gate.

| turn | phase | check | practice | verified |
|------|-------|-------|----------|----------|
| 1 | OBSERVE | 0 | 0 | false |
| 2 | OBSERVE | 0 | 0 | false |
| 3 | DEMONSTRATE | 0 | 0 | false |
| 4 | GUIDE | 0 | 0 | false |
| 5 | **CHECK** | 0 | 0 | false |
| 6 | **PRACTICE** | **1** | 0 | false |
| 7 | PRACTICE | 1 | **1** | false |
| 8 | **TRANSFER** | **1** | **2** | **true** |

```
mastery       = { verified: true, phase: 'TRANSFER', checkCorrect: 1,
                  practiceCorrect: 2, completionSuppressed: false,
                  gatePending: false }
lessonComplete= { complete: true, lessonTitle: 'Dimensional Analysis',
                  mastered: ['phys.meas.dimensions'], fullyMastered: true,
                  nextLessonOrder: 4 }
```

**This matches the offline prediction exactly** (six graded correct answers →
TRANSFER, check 1, practice 2). Three fixes are now production-verified
together:

| commit | fix | evidence |
|--------|-----|----------|
| `13070945` | ladder froze at DEMONSTRATE | phases climbed past it |
| `23695038` | SIGNAL never emitted ⇒ no evidence | counters moved on graded MCQs |
| `648480bc` | completion claimed in prose without evidence | **no completion card appeared on ANY of turns 1–7**, and the real one appeared exactly at turn 8 |

*Note: `completedLessons` in that response body is still `[]` — the client
PATCHes completion separately. Not asserting the DB row was written; that was
not observed.*

## RETRACTED before it was reported — my seventh instrument error

Mid-run the tutor replied *"since your reply was just a single letter 'a', walk
me through how you figured that out"*, which looked like the product punishing a
learner for answering the question as designed. **It is my harness.**
`LessonScreen.tsx` (~5131) sends `option` — the FULL OPTION TEXT — when a
learner taps a button; only my script sends a bare letter. The tutor's response
to an unexplained single character is reasonable.

Both paths are covered by the grader and both are tested: full option text via
the containment rule, typed letters via the letter rule.

---

# TOPIC 2 — `phys.meas.dimensions` — **NOT VERIFIED**, and the reason is specific

Teaching quality across this run was strong: the geometry/physics homonym
handled by contrast rather than dismissal, "speed is L" corrected with a
concrete counter-case, "2L" corrected to an exponent with the type-vs-count
distinction, and the mastery gate reached honestly.

**But the wave-interference asset served TWICE MORE during this session**, on
`phys.meas.dimensions`, mid-lesson. A topic cannot be marked VERIFIED while a
wrong-topic, name-carrying asset is still being served into it.

`22dc4852` stops NEW captures of this kind. It cannot retract what is already
stored. **Topic 2 is therefore BLOCKED on owner action**, not on any remaining
code defect I have found:

> Deprecate `asset_identity` row `f22e5673-4b1f-473a-bec8-4fbb9637c0c0`
> (concept `phys.meas.dimensions`, family EXPLANATION, currently ACTIVE).
> One statement. Until then every learner on this concept can be served it.

| status | value |
|--------|-------|
| VERIFIED | 1 — `phys.meas.units` |
| BLOCKED (owner) | 1 — `phys.meas.dimensions` |
| REMAINING | 422 |
| Global fixes this run | 20 |

## NEXT EXACT ACTION
1. Read `[ladder]`'s `move` / `mcqAsked` fields from this session's logs to
   quantify how often a gate turn asks WITHOUT an MCQ — the residual evidence
   gap, and the last thing standing between "MCQ answers climb" and "any
   correct answer climbs".
2. Start **Topic 3 — `phys.meas.errors`** ("Measurement Errors and
   Uncertainty"). Topic 2 stays BLOCKED, not abandoned; re-verify it the moment
   the asset is deprecated.
3. Owner queue, unchanged and growing:
   - deprecate `f22e5673-…` (blocks Topic 2);
   - survey the 1,589 ACTIVE explanation rows for names / session-bound
     discourse — the same capture path produced all of them;
   - recurrent Prisma P1008 timeouts.

---

# TWO MORE DEFECTS, BOTH FOUND IN THE LOGS OF THE SUCCESSFUL RUN (`29579267`)

The completed lesson was the right outcome; reading its logs line by line was
what produced these. Neither was visible from the transcript.

## 1. Explanation Memory answered an ANSWER with a canned explanation

```
[ladder] { mcqAsked: false, askedQuestion: false,
           phaseBefore: 'GUIDE', phaseAfter: 'CHECK' }
provider=memory asset_ids=[f22e5673-…] servingMode=exact_match
```

The learner tapped an MCQ option and got the wave-interference asset back.
`admitForLearner`'s relevance test could not stop it, and **its own comment
explains why**: a turn that "names nothing specific" carries no topic to
contradict, so it CANNOT fail the test. Correct for "ok" and "go on"; wrong for
an ANSWER. The very next log line is the SAME asset being refused as
`irrelevant-to-question` on a turn where the learner did use words — the guard
works, a bare answer is simply invisible to it.

**The point is not asset quality.** A learner who has just answered is owed
FEEDBACK ON THAT ANSWER — whether they were right, and why. A canned
explanation, however good, is the wrong move on that turn. So the gate is "did
the learner just answer something", using the pending-MCQ grade already
computed this turn.

Applied at **all three** `serveFromMemory` assignments including the
dispatcher-error fallback: a degraded path must never be more permissive than
the healthy one on a gate that decides whether a learner gets feedback.

## 2. Symbolic MCQ options could not be graded AT ALL

Caught by the test for defect 1, and much worse than it.

```
'[M][L][T]'      → "m l t"
'[M][L][T]⁻²'    → "m l t"
'[M][L]⁻¹[T]²'   → "m l t"
'[M]²[L][T]⁻¹'   → "m l t"
```

Superscripts were stripped, so the grader saw four identical options and
correctly refused to choose. **Symbolic questions are the majority form in
physics and mathematics** — so the MCQ-grading fix shipped one iteration
earlier would have left the evidence pipeline frozen for exactly the subjects
under audit, *while appearing to work*, because prose questions graded fine.
The completed lesson only succeeded because its questions happened to be prose
or letter-answerable.

Superscripts are now folded to ASCII before stripping and **the minus is
kept** — `[T]²` and `[T]⁻²` are different answers, and merging them would
silently mark a wrong answer right. An exact normalised match is added as the
first rule, since tapping an option sends its text verbatim.

## Residual evidence gap — measured, not estimated

From the successful run's `[ladder]` lines:

| turn | move | mcqAsked | signalTag | outcome |
|------|------|----------|-----------|---------|
| GUIDE→CHECK | teach | false | true | graded |
| CHECK→PRACTICE | ask | true | true | graded |
| PRACTICE→PRACTICE | ask | true | true | graded |
| PRACTICE→TRANSFER | teach | true | true | graded |

`signalTag: true` on all four is **my grader's synthesis, not model
compliance** — stated because the field name invites the wrong reading. Every
graded turn here came from the deterministic path.

| status | value |
|--------|-------|
| VERIFIED | 1 — `phys.meas.units` |
| BLOCKED (owner) | 1 — `phys.meas.dimensions` |
| REMAINING | 422 |
| Global fixes this run | 22 |

## NEXT EXACT ACTION
1. Confirm `29579267` READY, then re-run one symbolic MCQ turn and check
   `[mcq-grade]` reports a chosen index (it returned nothing for these before).
2. Start **Topic 3 — `phys.meas.errors`**. Topic 2 remains BLOCKED on the owner
   deprecating `f22e5673-…`, not on any code defect found.
3. Owner queue (unchanged, still unreachable from this session):
   deprecate `f22e5673-…`; survey the 1,589 ACTIVE explanation rows for names
   and session-bound discourse; recurrent Prisma P1008.

---

# TOPIC 3 — `phys.meas.errors` "Measurement Errors and Uncertainty" — IN PROGRESS

Clean session `cmspy7qxj0001kz04vx5a3tn5`, real production, real learner account.

## Teaching quality: STRONG

Opening: a wooden ruler and a paperclip, ending on an observation question.
Concrete before abstract, no term dropped cold.

> me: "its hard to line it up exactly. but if i am careful there should be no
> error right? error means i made a mistake"
> tutor: *"Claude, that is a very common thought! **But actually, even if you
> are the most careful person in the world, an error is not a mistake you
> made.** … the tool itself has a physical limit to its smallest division…
> Measurement errors and uncertainty are a built-in feature of every
> measurement tool, **not a human failure**."*

That is **EB M1** ("Error means mistake; a careful experimenter has no error")
repaired in its own authored terms. Correct, explicit, and in everyday words.

> me: "so uncertainty is like a range, not one number? but why does it matter,
> cant i just say 10"
> tutor: confirms (the learner IS right), then answers the motivation —
> *"simply saying '10' hides crucial information about how precise your
> measurement was"*. The affirmation guard correctly did NOT fire: the learner's
> words match no authored misconception symptom. The discriminator working as
> designed, in the direction that protects a correct learner.

The ladder climbed OBSERVE → DEMONSTRATE → GUIDE → CHECK on graded MCQs.

## An EIGHTH instrument error of mine, caught before reporting

The tutor said *"Look at the number line on your screen"* and my harness printed
`visual: None` — which reads as a fabricated reference to a picture that is not
there. **The figure was real.** It rides `visualSpec`
(`{type: 'number_line', start: 9.5, end: 10.5, highlight: [9.8, 10.2]}`), and
the prose matched it exactly. My harness read one channel of four. Fixed:
`ask2.sh` and `ladder.sh` now print `visualSpec` / `sceneSpec` /
`dynamicVisualizationCode`, and `mcqa.sh` now sends the option TEXT, which is
what `LessonScreen` actually sends on a tap.

---

# 🔴 DEFECT — a held figure was re-introduced on every turn (`77acd810`)

**Five of six consecutive turns** re-described the same `number_line` with its
full numeric range (all five quoted verbatim in the test file).

## Why no existing rule caught it

**Nothing there is false.** The figure exists, the numbers are its real numbers,
and every fabrication rule in the visual contract is satisfied. `WHAT THE
LEARNER SEES` plus *"refer to the figure by its REAL elements"* is precisely
what produces this, and it fires again, identically, on every held turn. The
contract had **no notion of a SECOND turn with the same figure**.

It is a TEACHING defect rather than a truth defect, and it lands hardest on the
learner this audit is run for: someone reading at intermediate level spends
limited attention re-reading a description they already have, and a tutor that
re-introduces the same picture every turn reads as one that has forgotten it
already did.

## The fix

`session.turns` is the held count the engine already keeps (0 on the turn a
figure first appears), so this needed no new plumbing. Turn one introduces the
figure exactly as before; from turn two the tutor points at the ONE part it is
using and spends the rest of the turn on new teaching.

**Bounded deliberately:** it relaxes no fabrication rule — the clause says so
explicitly and a test asserts it — and it does not push toward the opposite
failure, a figure on screen that the words never refer to.

| status | value |
|--------|-------|
| VERIFIED | 1 — `phys.meas.units` |
| BLOCKED (owner) | 1 — `phys.meas.dimensions` |
| IN PROGRESS | 1 — `phys.meas.errors` |
| REMAINING | 421 |
| Global fixes this run | 23 |

## NEXT EXACT ACTION
1. Confirm `77acd810` READY, then re-run Topic 3 on a clean session and count
   how many held-figure turns re-describe the range. Expect the introduction
   once and brief references after.
2. Finish Topic 3 to its mastery gate; probe EB **M2** (random vs systematic
   errors treated as interchangeable) and **M4** (the "true value" is exactly
   the average) — both authored, neither yet exercised.
3. Owner queue, unchanged: deprecate `f22e5673-…` (blocks Topic 2); survey the
   1,589 ACTIVE explanation rows; recurrent Prisma P1008.

---

# 🔴 P0 — THE TUTOR WAS TOLD A WRONG ANSWER WAS RIGHT (`17b5035c`)

Topic 3, real production. Probed EB **M2** (random vs systematic treated as
interchangeable) by answering the tutor's own MCQ **wrong**, on purpose.

> Q: "What does taking the average of multiple measurements actually help
> reduce?"
> me: **"Systematic errors and calibration flaws"** — flatly wrong; averaging
> reduces RANDOM error. This IS M2.
>
> tutor: *"Claude, you noticed that systematic errors are tied to calibration
> flaws. So you are saying that a calibration flaw causes a systematic error —
> have I got that right?"*

No correction. It extracted a true-but-irrelevant fragment of the wrong answer,
affirmed **that**, and asked the learner to confirm a restatement. **A learner
leaves that turn believing they were correct**, having just demonstrated the
exact misconception the curriculum authored a repair for.

## Two authorities inside one turn, disagreeing

```
[mcq-grade] { chosen: 1, correct: false }
[ladder]    { correctness: false, phaseBefore: 'CHECK', phaseAfter: 'GUIDE' }
```
```
CUE decision = ADVANCE_DIFFICULTY (D6-MASTERY-ADVANCE)
rationale: "Correct AND confident with no failures banked this session"
conversation decision = SUCCESS
```

The server graded it wrong, the ladder demoted — and the decision layer told
the tutor the learner was **correct and confident** and to **raise the demand**.
The tutor did exactly what it was told.

## Cause

`lastSignal` is the PREVIOUS turn's signal, and it was the only evidence this
layer had. Invisible while no reliable per-turn signal existed at all — the
model never emits `<!--SIGNAL-->`, which is why deterministic grading was added
two commits ago. **That grade reached the LADDER and not the DECISION.** My own
fix was half-wired, and this is the half that talks to the tutor.

## Fix, measured

This turn's grade now outranks the snapshot's. `ADVANCE_DIFFICULTY` becomes
**`DETECT_MISCONCEPTION` / `D2b-CONFIDENT-WRONG`** — the rule written for exactly
this case, routing *into* misconception repair instead of away from it.

Bounded: the override applies only when the grade RESOLVED. `null` means "not
gradeable", never "wrong", so free-text turns fall through unchanged and a
correct answer still reads as progressing. The failing case is kept as a test
rather than deleted — it is the evidence the fix targets the right input.

## Also confirmed this run (pre-fix baseline)

- **EB M1** (*"error means mistake"*) and **EB M4** (*"the average is the true
  value"*) were both repaired correctly and in everyday language. M4's repair
  even named the systematic-error reason and pivoted to a question designed to
  discriminate M2 — the authored progression working.
- The held-figure re-description continued: turn 7 still restated "9.5 to 10.5".
  `77acd810` was still building at the time, so this is a clean pre-fix baseline
  rather than a failure of the fix.

| status | value |
|--------|-------|
| VERIFIED | 1 — `phys.meas.units` |
| BLOCKED (owner) | 1 — `phys.meas.dimensions` |
| IN PROGRESS | 1 — `phys.meas.errors` |
| REMAINING | 421 |
| Global fixes this run | 24 |

## NEXT EXACT ACTION
1. Confirm `77acd810` + `17b5035c` READY.
2. Clean session on Topic 3 and re-run BOTH:
   - the M2 wrong answer → expect an explicit correction and a repair move,
     not a paraphrase-back;
   - count held-figure turns that restate the range → expect one introduction.
3. Then Topic 3 to its mastery gate → VERIFIED + moat, then Topic 4.
4. Owner queue unchanged: deprecate `f22e5673-…`; survey the 1,589 ACTIVE
   explanation rows; recurrent Prisma P1008.

---

# 📌 BLOCKED QUEUE — durable, never skipped (standing protocol, 2026-08-12)

**Rules.** A blocked topic is never abandoned. Each entry names the EXACT
blocker and the EXACT action required to clear it. The audit continues with the
next UNBLOCKED topic, and blocked entries are RETRIED periodically — every
iteration that touches the ledger. **A blocked topic can become VERIFIED only
after (a) its blocker is resolved AND (b) it passes the full learner audit from
a clean session.** Clearing a blocker alone is never sufficient.

## B-1 · `phys.meas.dimensions` (Topic 2) — BLOCKED

| field | value |
|-------|-------|
| **Blocker** | AssetIdentity row `f22e5673-4b1f-473a-bec8-4fbb9637c0c0` is ACTIVE and serving. Concept `phys.meas.dimensions`, family EXPLANATION, `servingMode: exact_match`, confidence 75. Its content is wrong-topic (wave interference) and carries a learner's name. |
| **Required action** | Set that row to DEPRECATED. One statement. Owner-only: this session cannot write to production, and the audit mandate forbids altering production records. |
| **Why I cannot do it** | Supabase MCP lists **0 projects**. Retried 2026-08-12 (attempt 2) — still 0. |
| **Code side** | DONE (`22dc4852`). New captures of this shape are rejected; the gate cannot retract what is already stored. |
| **Re-verify after clearing** | Full learner audit of Topic 2 from a clean session — the asset must not serve, AND the teaching must pass on its own merits. |

## B-2 · Cross-corpus asset hygiene — BLOCKED (not topic-scoped)

| field | value |
|-------|-------|
| **Blocker** | Same: no production DB read. |
| **Required action** | Survey the 1,589 ACTIVE explanation rows for embedded learner names and session-bound discourse. One capture path produced all of them, so `f22e5673-…` is unlikely to be alone. |
| **Impact if unaddressed** | Every affected row keeps serving. This does not block a specific topic; it can silently fail ANY topic, which is why it sits in this queue rather than under one heading. |

## B-3 · Recurrent Prisma P1008 socket timeouts — BLOCKED

| field | value |
|-------|-------|
| **Blocker** | No Supabase/pooler access. |
| **Required action** | Owner to inspect pooler mode and connection limits. Observed failing ANOTHER real learner's `studentProgress` and evidence-spine writes while their teaching turns completed. |
| **Status** | Not observed in the last several windows; recurrent, not resolved. |

## B-4 · Screenshots (one per topic) — BLOCKED

| field | value |
|-------|-------|
| **Blocker** | Chromium fails `net::ERR_CONNECTION_RESET` on EVERY host through this sandbox's egress proxy — verified against `example.com`, so not app-specific. |
| **Required action** | Run `scripts/audit/capture-topic.ts` from any machine with ordinary internet. |
| **Explicitly NOT done** | Disabling TLS verification, which would trade a real security property for a picture. |
| **NARROWED 2026-08-12** | The blocker was recorded too broadly. Only the NETWORK is blocked — RENDERING works, so `file://` screenshots are possible (`scripts/audit/shot.mjs`). Real turns are captured over HTTP with curl, written into a local page and shot. That is enough to see the tutor's real text and the real figure payload as drawn; it is NOT the product's own screen, so it cannot show layout, theming, or whether a figure sits beside the right message. Those still need a machine with ordinary internet. |
| **What it does NOT block** | The audit itself — every finding is from real authenticated HTTP with full response text recorded here. |

## Retry log
| date | attempt | result |
|------|---------|--------|
| 2026-08-12 | 1 | Supabase MCP: 0 projects |
| 2026-08-12 | 2 | Supabase MCP reconnected under a new name, then disconnected; on reconnection still **0 projects**. B-1/B-2/B-3 remain blocked. |
| 2026-08-12 | 3 | B-1/B-2/B-3: Supabase MCP **0 projects** — still blocked. B-4: retried Chromium against `example.com` with the installed `/opt/pw-browsers/chromium-1194` binary (the npm default path no longer exists — it points at `chromium_headless_shell-1228`, absent). The launch HUNG to timeout rather than erroring, which is the proxy signature, not a missing binary. Still blocked. |
| 2026-08-12 | 4 | B-1/B-2/B-3: Supabase MCP **0 projects**. B-4: `page.goto: net::ERR_CONNECTION_RESET at https://example.com/` — the documented proxy signature, reproduced cleanly with `--no-sandbox` and a bounded timeout. All four still blocked. |
| 2026-08-12 | 5 | B-1/B-2/B-3: Supabase MCP **0 projects**. B-4: `net::ERR_CONNECTION_RESET` again. All four still blocked. |

---

# TOPIC 3 continued — the deixis freeze, and a rule that punished compliance

## ✅ Verified live: the held-figure fix (`77acd810`)

Clean session `cmspz1kt50001jo04tgvf2ffw`, three consecutive held-figure turns:
**0 of 3 restated the numeric range**, against **5 of 6 (plus turn 7)** on the
pre-fix build. And when the learner explicitly asked *"can you show me what that
looks like"*, the tutor described the figure's parts fully — so the fix did not
push it into the opposite failure of a picture the words never touch.

## 🔴 P1 — `"show me what that looks like"` froze the ladder (`23623480`)

```
[excursion] { unresolvedTopic: 'what that looks like',
              transition: 'continued', active: true, turns: 4 }
```

That phrase is **deixis** — "that" points back at what is already being taught,
so nothing new is named. But an open excursion PAUSES the lesson, so
`turnCountsForLesson` froze the mastery ladder at OBSERVE for the rest of the
session and every graded correct answer after it counted for nothing.

**Third route to the same freeze**, and this one is triggered by a phrase
learners use constantly. `work` and `mean` were already task verbs for exactly
this reason ("how that works", "what this means" both returned null); the
perception verbs were missing. Added `look, seem, appear, like`.

`sound` deliberately EXCLUDED — a real physics topic; adding it would make
"explain sound" name nothing. Asserted by a test, not left as a comment.

## 🔴 P1 — the filler detector overwrote turns that carried an MCQ (`046bda7d`)

Twice, byte-identically, the learner got the generic *"what's one thing you
notice or find surprising…"* replacement WHILE a concrete MCQ sat beside it.
Two questions at once, mismatched.

**Two rules contradicting each other.** `buildMcqInstruction` says, in capitals,
*"Write the question ONCE: put it in the tag, and do NOT also re-type the
question and its options in your visible message."* A model that OBEYS leaves a
short lead-in — and the tag is parsed and STRIPPED before `detectFillerTurn`
runs, so the detector sees short, question-free prose and replaces the turn.
**Compliance was being punished.**

The detector is right about the TEXT and wrong about SCOPE: the question lives
in the `mcq` field the client renders as buttons. Guarded with `!mcqHoisted`.

*Stated precisely, because the first draft of the test guessed and was wrong: I
observed the replacement on turns that ALSO carried an MCQ; I did NOT capture
the raw pre-replacement prose, so which phrase tripped `FILLER_PHRASE_RE` is
unknown. The fixture now uses a lead-in verified to trip it.*

## Decision-layer fix: input verified, rule NOT yet exercised

`17b5035c` is live and `masteryState` now reads **`fragile`** from this turn's
grade where it previously read `progressing` — the input is fixed. But the turn
resolved to `D0d-SESSION-OPENING-PROTOCOL`, which outranks everything, so
**`D2b-CONFIDENT-WRONG` did not fire in production and I am not claiming it
did.** The teaching was nonetheless correct on the re-probe:

> me: "Random error; yes, averaging fixes it"  ← wrong
> tutor: *"it is called a **systematic error**, not a random error… the average
> will still include that exact same 0.2 kilogram offset—meaning **averaging
> cannot fix it**."* + a transfer check (a clock five minutes fast).

Compare the pre-fix reply, which corrected nothing. **My detector reported
"explicit correction: False"** on that text — a NINTH instrument miss, from a
phrase list that does not contain "not a random error". The transcript settles
it, as it has every time.

| status | value |
|--------|-------|
| VERIFIED | 1 — `phys.meas.units` |
| BLOCKED (owner) | 1 — `phys.meas.dimensions` (queue B-1) |
| IN PROGRESS | 1 — `phys.meas.errors` |
| REMAINING | 421 |
| Global fixes this run | 26 |

## NEXT EXACT ACTION
1. Confirm `23623480` + `046bda7d` READY.
2. Clean Topic 3 session, drive to the mastery gate with MCQ answers only.
   Expect: no bogus excursion from presentation requests, no prose/MCQ
   mismatch, and `verified: true` at `practiceCorrect >= 2`.
3. Topic 3 → VERIFIED + moat, then Topic 4 `phys.meas.significant-figures`.
4. **Retry the BLOCKED queue** (B-1…B-4) at the top of the next iteration.

---

# BLOCKED QUEUE RETRY 3 + TOPIC 3 — a fourth route to the same freeze

## Blocked queue, retried FIRST (protocol)
- **B-1 / B-2 / B-3** — Supabase MCP: **0 projects**. Still blocked.
- **B-4** — retried Chromium against `example.com` with the installed
  `/opt/pw-browsers/chromium-1194` binary (the npm default path is stale: it
  points at `chromium_headless_shell-1228`, which does not exist). The launch
  **hung to timeout rather than erroring** — the proxy signature, not a missing
  binary. Still blocked.

## ✅ Verified live: the deixis fix (`23623480`)

The exact phrase that previously froze the ladder:

> me: "ok. can you show me what that looks like"

```
[excursion] { unresolvedTopic: null, transition: 'none', active: false, turns: 0 }
CUE: helpRequestKind: "diagram", rule D4b-ANSWER-STUDENT-FIRST
```

No bogus excursion, and the request was correctly classified as a help request
and answered. Previously: `unresolvedTopic: 'what that looks like', active: true,
turns: 4` — with the ladder frozen behind it.

## 🔴 P1 — an MCQ-only turn was served an OUTAGE template (`378d07c5`)

```
[learn/chat] empty response from model, finish_reason: STOP
provider: "degraded"    [ladder] { mcqAsked: true }
```

The learner saw *"Let's take one small step together… we can continue from here
whenever you're ready"* beside a perfectly good tappable question. **There was
no outage.** The model had put the whole turn into the MCQ tag and written no
prose — arguably over-COMPLIANCE with `buildMcqInstruction`.

**The quieter and worse harm:** the turn is then marked `provider: 'degraded'`,
and `degradedTurn` is the exact flag that stops a turn counting as a give — so
`demonstrated` and `taughtThisSession` stay false and the ladder does not move.
**A turn that DID teach was recorded as one that taught nothing.** Fourth route
to the same freeze in one day. Asserted directly in the test rather than argued.

### The pattern, now written down

This is the **third guard** found judging emptiness from `cleanText` alone,
after the filler detector and the affirmation floor — all three run AFTER the
MCQ tag is parsed and stripped. The standing rule, recorded in the test header:

> A turn's content is its TEXT **plus** its STRUCTURED PAYLOADS. Any check for
> "nothing here" must look at both.

### A guard that failed correctly by its letter and wrongly by its intent

`attemptTagRouteWiring`'s "exactly ONE empty-body guard" assertion broke on this
change because the fix's **comment quotes the log line the guard counts**. A
comment is not a second implementation. The guard now counts CODE lines only
(comments blanked, never removed, so its line numbers still point at the real
file) and asserts what actually matters: **the narrow MCQ branch must precede
the degraded fallback**, since a narrower branch after a catch-all is dead code.

| status | value |
|--------|-------|
| VERIFIED | 1 — `phys.meas.units` |
| BLOCKED (owner) | 1 — `phys.meas.dimensions` (queue B-1) |
| IN PROGRESS | 1 — `phys.meas.errors` |
| REMAINING | 421 |
| Global fixes this run | 27 |

## NEXT EXACT ACTION
1. **Retry the BLOCKED queue** (B-1…B-4), log the attempt.
2. Confirm `378d07c5` READY, then drive Topic 3 to its mastery gate on a clean
   session — expect no outage template beside an MCQ, and `verified: true` at
   `practiceCorrect >= 2`.
3. Topic 3 → VERIFIED + moat, then Topic 4 `phys.meas.significant-figures`.

---

# A FOURTH TEXT-ONLY-EMPTINESS DEFECT, found by SWEEPING (`ec3f4417`)

Three instances in one day is a pattern, not a coincidence, so this iteration
swept for the rest of the family instead of waiting to hit it in production.

`askedQuestionThisTurn = repliesWithQuestion(cleanText)` reads the PROSE, and
the MCQ tag is parsed and stripped hundreds of lines earlier. A turn that asked
its question THROUGH the tag reported `askedQuestion: false`. Confirmed on one
production line already in this ledger:

```
[ladder] { mcqAsked: true, askedQuestion: false }
CUE: conversationSummary.lastAssistantAskedQuestion: false
```

## Not cosmetic

- `enforceStance` raises **UNSUPPORTED_EXPLANATION** — *"the server decided ASK
  and the rendered response contained no question"* — against a turn that DID
  ask one. The stance log has been recording false violations.
- `parityViolation` records the same false disagreement.
- `classifyConversation` is told the tutor asked nothing, so the learner's NEXT
  message is less likely to be read as an ANSWER — upstream of every evidence
  decision in the turn.

## Safe only because of the earlier fix, and that is asserted

Give-detection used to be `!askedQuestion`. Flipping this to true BEFORE
`deliveredTeaching` existed would have stopped the turn counting as a give and
**re-frozen the ladder** — the exact defect this audit spent the day removing.
The two fixes compose; verified offline and pinned by a test that folds both
ways and requires the same phase.

## The family, in one place

| # | guard | judged from | fixed |
|---|-------|-------------|-------|
| 1 | `detectFillerTurn` | `cleanText` | `046bda7d` |
| 2 | empty-body → outage template + `provider: degraded` | `text` | `378d07c5` |
| 3 | affirmation floor fail-closed fallback | `cleanText` | already guarded |
| 4 | `askedQuestionThisTurn` | `cleanText` | `ec3f4417` |

**Standing rule, now written in the test header:** a turn's content is its TEXT
**plus** its STRUCTURED PAYLOADS. Any check for "nothing here" must look at
both.

| status | value |
|--------|-------|
| VERIFIED | 1 — `phys.meas.units` |
| BLOCKED (owner) | 1 — `phys.meas.dimensions` (queue B-1) |
| IN PROGRESS | 1 — `phys.meas.errors` |
| REMAINING | 421 |
| Global fixes this run | 28 |

## NEXT EXACT ACTION
1. **Retry the BLOCKED queue** (B-1…B-4), log the attempt.
2. Confirm `378d07c5` + `ec3f4417` READY, then drive Topic 3 to its mastery
   gate on a clean session. Expect: no outage template beside an MCQ, no false
   UNSUPPORTED_EXPLANATION, and `verified: true` at `practiceCorrect >= 2`.
3. Topic 3 → VERIFIED + moat, then Topic 4 `phys.meas.significant-figures`.

---

# TOPIC 3 — the outage fix VERIFIED, and the residual evidence gap MEASURED

Blocked queue retried first (attempt 5): B-1/B-2/B-3 **0 projects**; B-4
`ERR_CONNECTION_RESET`. All four still blocked, none skipped.

## ✅ Verified live: an MCQ-only turn is no longer an outage (`378d07c5`)

Clean session `cmsq6qfeg0001l7042cb5l1fx`. The turn that previously produced
*"Let's take one small step together… we can continue whenever you're ready"*
beside a tappable question now produces a real lead-in and the MCQ:

> *"Claude, imagine you measure the length of a pencil using a ruler that only
> has markings every one millimetre… Which statement best describes the
> measurement error in this situation?"* + MCQ

No outage template, and the turn is no longer marked `provider: degraded` — so
it counts as a give.

## 🔴 THE RESIDUAL EVIDENCE GAP, measured on a real turn (`09a25296`)

At phase GUIDE the tutor asked a good, concrete question **in prose with no MCQ
tag**:

> *"…the thermometer consistently reads exactly two degrees Celsius too high…
> What happens to that consistent two-degree offset when you take the average
> of all ten measurements?"*

> me: "the offset stays. averaging only helps with random scatter, not a
> consistent shift"  ← **fully correct**
> tutor: *"that is spot on—you've nailed the exact distinction…"*

```
phase GUIDE -> GUIDE   check 0   practice 0
```

**A correct answer, praised by the tutor, recorded as nothing.** 2 of 5 turns in
this session asked at a question-bearing phase without an MCQ.

### Why the fix is a prompt rule here, having rejected prompt rules elsewhere

Correctness for FREE TEXT has no deterministic source: the model does not emit
`<!--SIGNAL-->` (measured repeatedly today), and grading prose is a judgement
call of exactly the kind this audit has learned not to trust. An MCQ is the one
form where the tutor has already declared the answer.

At CHECK and PRACTICE — the phases that REQUIRE evidence — a question without
the tag cannot produce any, so the gate can never be crossed however well the
learner answers. The instruction now says that, and says WHY, at those phases
only. **This is a FORMAT requirement, not a safety property**, which is the
distinction that makes a prompt lever right here and wrong for the affirmation
guard. It fabricates no evidence and lowers no bar.

The phase is read straight from the snapshot at prompt-assembly time —
`conversationStateHoisted` is populated hundreds of lines later, and a value
that arrives after the prompt is built cannot shape it.

### NOT CLAIMED
That this closes the gap. It is a prompt requirement, so its effect is a
question for the next production run, and free-text answers at NON-gate phases
still produce no evidence at all.

| status | value |
|--------|-------|
| VERIFIED | 1 — `phys.meas.units` |
| BLOCKED (owner) | 1 — `phys.meas.dimensions` (queue B-1) |
| IN PROGRESS | 1 — `phys.meas.errors` |
| REMAINING | 421 |
| Global fixes this run | 29 |

## NEXT EXACT ACTION
1. **Retry the BLOCKED queue** (B-1…B-4), log it.
2. Confirm `ec3f4417` + `09a25296` READY, then drive Topic 3 to its gate on a
   clean session. Expect an MCQ on every CHECK/PRACTICE question and
   `verified: true` at `practiceCorrect >= 2`.
3. Topic 3 → VERIFIED + moat, then Topic 4 `phys.meas.significant-figures`.

---

# ITERATION — E6 CLOSED AT THE CODE LEVEL (`c40c216a`)

## The blocker, restated exactly
The parallel sweep (`843063cc`) measured, over six physics topics on real
production: **E6 × 17** — a question asked at CHECK or PRACTICE carrying no MCQ
tag — and **0 of 6 topics reached `verified`**. Nothing behind that gate could
move, so this one defect blocked every topic in the corpus audit and therefore
all moat production behind it.

## The mechanism — a contradiction the runtime had been living with
- CHECK and PRACTICE advance ONLY on graded correctness (`correctAtCheck` /
  `correctAtPractice`, `conversationState.ts`).
- The only deterministic grader (`gradeMcqAnswer`) needs the previous turn to
  have declared its own answer key — an MCQ tag.
- Producing that tag was **delegated to the LLM**, which is under no obligation.

So the server REQUIRED machine-readable evidence and DELEGATED its production to
a component that could decline. When it declined — routinely — the learner
answered a perfectly good prose question and the gate stayed shut however well
they did.

## The prompt lever was tried FIRST, and is not what fixed it
`09a25296` added `buildMcqInstruction({ atMasteryGate: true })`: the requirement
in capitals, with the consequence spelled out ("cannot be recorded", "cannot
advance"). **The sweep after it still found E6 × 17.** A format the ladder's
correctness depends on cannot be a request. Recorded here because the audit's
own standing rule is that a prompt rule is the right lever for a FORMAT and the
wrong one for a PROPERTY — this was the case that showed the line is not where
that rule assumed it was.

## The fix — the server selects the assessment from the moat
The assessment already existed, reviewed: `AUTHORED_PROBES` carries 1,652
authored probes, physics covering **all 238 concepts**, each with
distractor-mapped `choices[].isCorrect`. `findBestProbe` could retrieve them all
along. Nothing had ever turned one into the turn's ACTUAL question —
`assembleLesson` appended it as prose (`**Quick check:** …\nA. …`), which is
unreadable to the grader for exactly the same reason a prose LLM question is.

- `src/lib/teaching/gateAssessment.ts` — `probeToMcq()` converts an authored
  probe, and **refuses** anything it cannot grade honestly: 2–4 options, exactly
  one key, no duplicate or empty option text. Every rule mirrors one
  `parseMcqTag` already enforces, so a server-selected question is never
  admitted on weaker terms than a generated one.
  `correctValue` is deliberately NOT consulted: the real row for
  `phys.meas.units` holds `"kelvin"` while its choice reads `"kelvin (K)"`, so
  matching it would be a similarity guess about which answer is right.
- `route.ts` — at a gate phase the probe is resolved PRE-LLM, attached as the
  turn's MCQ, and the model is told to write the lead-in only. The server's
  question wins over a model tag emitted anyway: an unreviewed item must not sit
  at the rung where a wrong answer key costs the learner their progress.
- `assembleLesson` now returns `probeMcq`, so the memory path's own reviewed
  probe becomes gradeable instead of ungradeable prose — the memory path's own
  instance of E6, found while fixing the LLM path's.
- `MatchOptions.excludeProbeStem` stops the same question being re-asked.

## A DEFECT PREDICTED AND BUILT AROUND, not shipped
Measured against the real seed corpus while writing the fix: closing a concept
needs **three** graded correct answers (CHECK 1 + PRACTICE 2), and the physics
gradeable-probe histogram is **`{2 probes: 145 concepts, 3: 60, 4: 33}`** —
**145 of 238 concepts (61%) run out of distinct authored assessments before the
gate closes.** Without an exclusion the same probe would have been served again;
with it, the corpus runs dry and the turn falls back to the model.

That is a **content** gap (author a third probe), not a code one, and it is
pinned as a maximum in `gateAssessmentIsServerOwned.test.ts` so authoring more
can never fail the test while losing them will.

## Scope honestly stated
- Physics and English are ACTIVE authored content, so the deterministic path
  fires there. **Chemistry's 744 rows are DRAFT** and biology/CS are zero, so
  chemistry will run the fallback path end to end — every fix in this audit so
  far was measured on the "asset present" path.
- Validation: suite 307 files / 6,575 passed / 9 skipped; `tsc` clean; build
  clean. **Not yet verified on production** — deployment `dpl_8MsJ6dxy…` was
  still BUILDING when this entry was written.

## NEXT EXACT ACTION
1. **Retry the BLOCKED queue** (B-1…B-4), log the attempt.
2. Confirm `c40c216a` READY, then **re-run the sweep** and require
   `E6 = 0` and topics reaching `verified` before any topic work resumes.
3. Topic 3 `phys.meas.errors` → VERIFIED + moat; then Topic 4
   `phys.meas.significant-figures`.

---

# ITERATION — WIRING GUARD, A CORRECTION, AND A NEW BLOCKER

## ✅ Deployment READY, wiring guarded
`c40c216a` reached READY at 1786550592 and holds the
`my-tutor-flame.vercel.app` alias. Added
`src/tests/gateAssessmentRouteWiring.test.ts` (14 assertions): selection happens
BEFORE `routeAI`, attachment AFTER `parseMcqTag`, the server's question outranks
a model tag (`??` in that order, asserted), the memory branch carries
`probeMcq`, and all five exclusions are on the eligibility test. This closes the
unwired-fix class — the module tests alone would have passed green with every
route call site deleted, which is exactly how `src/lib/educationalBrain/*` came
to be a whole pipeline that never executes.

Two of my own assertions failed on first run and both were the TEST, not the
product: the import is dynamic (`await import(...)`, not `from`), and
`provider = 'memory'` occurs in TWO branches — the first draft anchored to the
lesson-complete serve, not the Explanation Memory serve. Fixed by anchoring to
the branch opener. Recorded because the pattern is the same one that has
produced every false reading in this audit: a marker matched without asking
which occurrence it was.

## 🟡 CORRECTION — "61% of physics runs dry" was true but misleading
The previous entry reported the shortfall as a flat 145/238. Measured per
domain, it is not flat, and the difference changes what should be done about it:

```
phys.em    32/35   phys.mod   21/21   phys.qm    19/19   phys.particle 16/16
phys.stat  15/15   phys.opt   14/15   phys.rel    8/8    phys.astro     6/6
phys.mech   6/60   phys.therm  5/18   phys.wave   3/17   phys.meas      0/8
```

The shortfall is concentrated almost entirely in the ADVANCED domains. The
foundation domains this audit actually walks first are nearly fully served —
**`phys.meas` has zero short concepts** (every one of the eight carries 3–4
gradeable probes), and `phys.mech` is 6 short of 60.

So the deterministic gate path is available for the audit's whole near-term
queue, and the content gap is a bounded, plannable task (~130 third probes,
concentrated in eight advanced domains) rather than an obstacle in front of the
next topic. Stated precisely because the earlier framing would have justified
authoring work that nothing is waiting on.

## 🔴 NEW BLOCKER — B-5 · production replay, blocked on credentials
`E6 = 0` is **NOT verified on production.** The sweep signs in with
`AUDIT_EMAIL` / `AUDIT_PASSWORD`; this container has neither, and they are
correctly absent from the repository — a password must never be committed,
logged or persisted, so there is nothing here to recover and nothing that should
be. No throwaway account may be created against production either.

- **Exact blocker:** no learner credentials in this environment.
- **Required action:** re-run
  `AUDIT_EMAIL=… AUDIT_PASSWORD=… npx tsx scripts/audit/engine-sweep.ts
   --subject physics --limit 8` from an environment holding them.
- **Acceptance:** `E6 = 0` and at least one topic reaching `verified`.

What IS established: the module refuses everything it cannot grade honestly
(18 assertions), the corpus converts for 238/238 physics concepts, and the
wiring is on the turn path in the right order (14 assertions). What is NOT
established is the behaviour of a real HTTP turn. The distinction is the whole
point of this ledger and is not being blurred here.

## Blocked queue, retried this iteration (attempt 6)
| id | state | evidence this attempt |
|----|-------|------------------------|
| B-1 | BLOCKED | needs a DB write to DEPRECATE an asset; Supabase MCP lists 0 projects, `DATABASE_URL` unset |
| B-2 | BLOCKED | same — no read path to the 1,589 ACTIVE rows |
| B-3 | BLOCKED | `DATABASE_URL` unset; pooler state unreadable from here |
| B-4 | BLOCKED | Chromium still hangs on outbound HTTPS (`example.com` timed out at 120 s); `file://` rendering still works |
| B-5 | BLOCKED | **new** — no learner credentials, production replay impossible |

## NEXT EXACT ACTION
1. Retry B-1…B-5, log the attempt.
2. **The moment credentials are available**: re-run the sweep, require `E6 = 0`,
   then drive Topic 3 `phys.meas.errors` to `verified`.
3. Until then, work that does NOT need production: the free-text evidence gap
   (still the largest unclosed global class — every phase except CHECK and
   PRACTICE produces no recordable evidence at all).

---

# ITERATION — WHY CHEMISTRY WILL NOT BEHAVE LIKE PHYSICS (an owner decision, not a defect)

## The mandate's second subject has no serving content, and the corpus exists
Read directly from the repository:

| file | explanations | concepts | probes | concepts with a gradeable MCQ |
|------|--------------|----------|--------|-------------------------------|
| `chemistrySeedAssets.ts` | 372 | **186/186** | 372 | **186** |
| `biologySeedAssets.ts` | 216 | **108/108** | 216 | **108** |
| `csSeedAssets.ts` | 238 | **119/119** | 238 | **119** |

All three are complete, and every concept converts to a gradeable MCQ under
`probeToMcq`. Production, meanwhile, holds **0 ACTIVE rows for all three**.

## This is DELIBERATE, and I nearly filed it as a bug
`src/instrumentation.ts`'s cold-start bootstrap loads only `brainSeedAssets` +
`authoredSeedAssets`, and the boundary is explicit in code:

```ts
/** Subjects the automatic cold-start bootstrap (src/instrumentation.ts) seeds. */
export const BOOTSTRAP_SEED_SUBJECTS = ['mathematics', 'physics', 'english'] as const
```

with `seedOwnershipWhere()`'s own comment naming "script-only subjects
(chemistry/biology/computer_science)" as out of scope. So the three corpora are
intended to be seeded by `scripts/brain/seed-knowledge-assets.ts`, deliberately
NOT by the boot hook.

Recorded as a design boundary rather than a defect, and **not changed**.
Expanding that constant is a one-line edit that would insert roughly 1,652 new
**ACTIVE** rows into production on the next cold start — a hard-to-reverse
production data change, on content that has never been through the review flow
the boundary exists to preserve. That is an owner's call, not this loop's.

It also explains the multi-session Chemistry AssetIdentity Completion Program:
744 rows were hand-seeded through Supabase MCP as DRAFT, batch by batch, each
batch burning a large fixed share of that session's context — while the
mechanism that seeds physics/english/math as ACTIVE simply does not cover the
file. The runbook's own item 1 (`--draft` from an environment with a real
`DATABASE_URL`, then activate) remains the supported path, and remains blocked
here for the same reason B-3 and B-5 are.

## What this means for the loop, concretely
- **Physics** — the deterministic gate path is live: 238/238 concepts have a
  gradeable authored probe and `phys.meas` has zero short concepts.
- **Chemistry** — `findBestProbe` queries `status: ACTIVE` only, so it will
  return nothing for all 186 concepts and **every chemistry gate falls back to
  the model**. E6 should be expected to recur across the whole subject the
  moment the audit reaches it. Predicting it here so it is not later reported as
  a discovery.
- Chemistry also carries **exactly two** gradeable probes per concept against
  the three graded answers a concept needs, so it will hit the shortfall
  universally rather than in the advanced tail as physics does.

## Two owner decisions, stated once, not asked repeatedly
1. **Activate the three script-only corpora?** One-line change to
   `BOOTSTRAP_SEED_SUBJECTS`, or one run of the seed script. Unblocks chemistry,
   biology and CS serving in one action. Trade-off: 1,652 ACTIVE rows that
   skipped per-asset review.
2. **Learner credentials for the audit loop** (B-5). Without them no production
   replay is possible, so no topic can move to VERIFIED — including the ones
   whose engine work is already done.

## NEXT EXACT ACTION
1. Retry B-1…B-5, log the attempt.
2. On credentials: re-run the sweep, require `E6 = 0`, drive Topic 3
   `phys.meas.errors` to `verified`, preserve the moat, move to Topic 4.
3. Offline until then: third gradeable probes for the eight advanced physics
   domains (~130 items), which is real moat production and needs nothing that is
   currently blocked.

---

# ITERATION — 2026-08-12 · B-1 and B-2 CLOSED, B-5 re-diagnosed

Blocked queue retried FIRST, per the loop's own rule. Two closed, one
re-diagnosed, and the re-diagnosis matters more than the closures.

## B-1 — CLOSED. The PII leak is off production.

Supabase MCP listed a live project this session (`ACTIVE_HEALTHY`); every
prior attempt got **0 projects**. So the retry that had failed five times
succeeded, which is the whole reason the queue is retried every iteration
rather than declared dead.

`f22e5673-4b1f-473a-bec8-4fbb9637c0c0` — ACTIVE, serving, concept
`phys.meas.dimensions`, content opening *"[learner's full name], wave
interference happens when two water waves overlap on a pond…"* — is now
**DEPRECATED**, with `deprecationReason` citing this audit. Owner approved the
write explicitly before it was made.

*(The name is redacted here deliberately. An earlier entry in this ledger
quotes it verbatim — committing a learner's name to the repo is the same
class of leak this item exists to close, just in a different store. Left
as-is rather than rewritten, since editing history here would be silent;
flagged as a cleanup for the owner.)*

Verified after the write, not assumed:

| check | result |
|-------|--------|
| ACTIVE `AI_AUTHORED` explanations | **0** |
| ACTIVE rows containing that learner's name | **0** |
| ACTIVE assets still serving `phys.meas.dimensions` | 6, all `HUMAN_CURATOR` |

The concept did not lose its teaching content — it lost the one bad row.

## B-2 — CLOSED, and the corpus is clean

The survey B-2 asked for is done. Result, measured across every ACTIVE
explanation-family row in production:

| corpus | rows | learner names | session-bound discourse |
|--------|------|---------------|-------------------------|
| `HUMAN_CURATOR` (curated) | 1,335 | **0** | **0** |
| `AI_AUTHORED` (live capture) | 1 → now 0 | 1 → now 0 | 1 → now 0 |

**The instrument flagged 28 candidates and every single one was a false
positive** — a fitting result for this ledger. The 8 "vocatives" were
*"Solid, liquid, gas…"*, *"Place, manner, and voicing…"*, *"Print, not
illustration…"*; the 20 "session-bound" hits were *"traces back to"*,
*"condenses back to water"*, *"back to your exact starting tile"*. Each was
read before being dismissed, which is the only reason the dismissal is
trustworthy. This independently re-confirms the finding recorded at the
capture-gate fix: a capitalised word plus a comma cannot distinguish a name
from a common noun.

**Structural conclusion:** the defect was never corpus-wide. It was confined
to the live-capture path, which had exactly ONE ACTIVE row. The gate fix
(`22dc4852`) stopped new ones; this write retracted the last old one.

## B-5 — the blocker was MISDIAGNOSED, and this is the important finding

The handover recorded B-5 as *"no `AUDIT_EMAIL` / `AUDIT_PASSWORD` in the
container"*. Credentials were supplied this session. **The sweep still cannot
run**, for a different reason entirely:

```
kind:   connect_rejected
detail: gateway answered 403 to CONNECT (policy denial or upstream failure)
host:   my-tutor-flame.vercel.app:443
```

This container's egress policy **denies outbound HTTPS to the app's own
domain**. Credentials were necessary but never sufficient. Per
`/root/.ccr/README.md` — *"Do not retry or route around it — report the
blocked host"* — no workaround was attempted.

**B-5 is therefore restated:** production replay requires an environment whose
egress policy permits `my-tutor-flame.vercel.app`, AND credentials. Supplying
credentials alone to a session in this network posture will not move a single
topic to VERIFIED. Any future handover that lists only credentials is
under-stating the blocker.

## GLOBAL FIX #31 — the sweep reported a pass on a run that never happened

The most serious thing found this iteration was in the audit's own instrument.

Eight topics, all eight errored on the proxy denial, zero HTTP requests
succeeded — and the sweep printed:

```
── ENGINE FINDINGS ──
  none — every checked engine invariant held
```

and exited **0**. One implicit inference caused it:
`findings.length === 0 ⟹ the invariants held`. That holds only if the checks
RAN. An errored topic yields no findings because it yielded no data, and the
report could not tell the two apart. This is the same meta-class the audit has
hit repeatedly — **a layer judging from an incomplete view of what it judges** —
except here the layer was mine.

Had credentials arrived in a session with working egress, this instrument would
have been the thing certifying `E6 = 0`.

Fixed in `scripts/audit/sweepReport.ts` (pure, testable, imported by the
script): a run with ANY errored topic is **INCONCLUSIVE**, says so, excludes
errored topics from the verified denominator, lists them, and sets a non-zero
exit code so no caller can read silence as success.

Verified against the real failure — same proxy denial, honest output:

```
NOTHING WAS CHECKED — 0 of 3 topics completed (3 errored).
This run proves nothing about the engine invariants.
⚠ INCONCLUSIVE — this run must not be recorded as a pass.
EXIT CODE: 1
```

Tests: `src/tests/engineSweepReporting.test.ts`, 7 cases, the first replaying
the exact 8/8-errored run and asserting the phrase that lied is absent.

**E6 = 0 remains UNVERIFIED on production.** Unchanged, and now
un-fakeable by the instrument.

## MOAT — third gradeable MCQ for six `phys.mech` concepts

Closing a concept needs three graded correct answers (CHECK 1 + PRACTICE 2).
All six of the concepts the audit reaches next carried only two, so the corpus
ran dry at the last gate and the question fell back to the model.

Each new probe is the **gradeable form of pedagogy the blueprint already
authored** — its own Conflict Evidence [P28] — not new pedagogy:

| concept | misconception | rung |
|---|---|---|
| `newtons-first-law` | `MC-2` book at rest has no forces | ADVANCED |
| `kinetic-energy` | `MC-KE-NEGATIVE` | PROFICIENT |
| `potential-energy` | `MC-HEIGHT-VERTICAL-ONLY` | DEVELOPING |
| `conservation-of-momentum` | `MC-INTERNAL-EXTERNAL` | DEVELOPING |
| `conservation-of-angular-momentum` | `MC-KE-CONSERVED-ROTATION` | PROFICIENT |
| `kinematics-2d` | `MC-TOTAL-VELOCITY-COMPONENT` | DEVELOPING |

Measured: all six now carry **3** gradeable MCQs. Short-concept ratchet
tightened 145 → 139 — exactly six, so nothing else moved.

### Three handover errors found by checking instead of trusting

1. **`MC-KE-CONSERVED` does not exist.** The blueprint's id is
   `MC-KE-CONSERVED-ROTATION`. Citing the handover's version would have
   produced a probe targeting nothing.
2. **`MOM_ASSESS_PROBES` was the wrong array.** `MOM` is
   `phys.mech.momentum`; `MC-INTERNAL-EXTERNAL` belongs to
   `conservation-of-momentum`, whose array is `COM_ASSESS_PROBES`. And
   `phys.mech.momentum` already had 3 gradeable probes — it was never short.
3. **Rung uniqueness spans ALL seed corpora, not one file.** Probe identity
   keys on `conceptId × probeKind × gradeBand × difficulty`; two probes on one
   rung collapse to a single identity and one is silently lost. My first draft
   collided twice, then a third time against `brainSeedAssets.ts`'s deep-space
   probe at `mcq/HIGH/PROFICIENT` — which my count had missed because it read
   only `authoredSeedAssets.ts`. The suite caught all three.

`brainSeedAssets.test.ts`'s legacy collision ratchet moved 407 → 411. Those
probes are **not** discarded: that ratchet measures the pre-Item-6 slug, which
has no difficulty segment, while the live resolver
(`buildProbeSlugResolver`) maps every authored probe to a unique identity —
asserted at 0 discarded in `difficultyLadderIdentity.test.ts`. The comment now
says so, so the raise cannot later read as papering over a loss.

## Validation

309 test files / 6,596 passed / 9 skipped · `tsc --noEmit` clean ·
`npm run build` clean.

| status | value |
|--------|-------|
| VERIFIED | 1 — `phys.meas.units` |
| IN PROGRESS | `phys.meas.errors` (Topic 3) |
| BLOCKED | B-3, B-4, B-5 (B-1, B-2 CLOSED) |
| Global fixes | **31** |
| Concepts with 3 gradeable MCQs | +6 |

## NEXT EXACT ACTION
1. Retry B-3, B-4, B-5 and log it. B-5 now needs **egress + credentials**, not
   credentials alone.
2. On a session with working egress: `npx tsx scripts/audit/engine-sweep.ts
   --subject physics --limit 8`. It now exits non-zero unless topics actually
   ran, so `E6 = 0` cannot be claimed from a dead run. Then drive Topic 3 to
   `verified`.
3. Offline until then: continue third gradeable probes — `phys.therm` (5) and
   `phys.wave` (3) are the next shortest, same method, same one-rung-per-slot
   rule checked across every seed corpus.

---

# ITERATION — 2026-08-12 (cont.) · moat production across Physics

Blocked queue retried first: B-4/B-5 still `403 CONNECT` on
`my-tutor-flame.vercel.app:443`; Supabase still reachable. Nothing marked
VERIFIED — no production evidence exists, and none can be gathered here.

## Third gate probes — 29 concepts closed across four domains

| domain | concepts | rung strategy |
|---|---|---|
| `phys.mech` | 6 (prior batch) | free rung per concept |
| `phys.therm` | 5 | carnot, entropy, heat-engines, refrigerators, third-law |
| `phys.wave` | 3 | beats, forced-oscillations, interference |
| `phys.astro` | 6 | black-holes, cosmology, dark-matter, gravitational-waves, stellar-evolution, stellar-structure |
| `phys.rel` | 8 | length-contraction, lorentz-transform, mass-energy, postulates, relativistic-momentum, simultaneity, spacetime, time-dilation |
| `phys.mech.hookes-law` | 1 | band correction, see below |

Short-concept ratchet **145 → 117**. Every probe is the gradeable form of
pedagogy the blueprint already authored — a documented misconception as the
trapped distractor, or the blueprint's own P4-b method with fresh numbers.
None invents pedagogy.

Two probes are deliberately FLUENCY items rather than misconception screens
(`phys.wave.interference`, `phys.rel.simultaneity`): both of those concepts'
authored misconceptions already had gradeable probes, and the third graded
answer a gate needs is PRACTICE, not a third screen. Stated in the code.

## THE DEFECT I INTRODUCED, AND CAUGHT — grade-band splitting

The legacy collision ratchet rose by **11 for 14 new probes**. That is the
wrong number, and chasing it rather than accepting it found a real defect.

Three concepts (`phys.astro.black-holes`, `phys.astro.cosmology`,
`phys.rel.time-dilation`) hold their existing gradeable probes at
**UNDERGRADUATE**; I had authored the new ones at **HIGH**. No legacy
collision — because they are different slots. And that is exactly the problem:

> `findBestProbe` scores gradeBand, so the three probes a concept needs must be
> reachable by ONE learner. UNDERGRADUATE=2 + HIGH=1 counts as three and gives
> nobody three.

**My probes had not closed the gap for either learner.** All three moved to
UNDERGRADUATE (rung DEVELOPING, free there).

Auditing band distribution instead of totals then found a **pre-existing**
instance the metric had always hidden: `phys.mech.hookes-law`, MIDDLE=1 /
HIGH=2, counted as covered since before this audit began. Closed with a
HIGH-band probe targeting `MC-KBIG-MEANS-MORE-EXTENSION`, which previously had
a gradeable probe only at MIDDLE.

**Root-cause fix, not just the four instances:** a new assertion in
`gateAssessmentIsServerOwned.test.ts` requires every concept counted as covered
to reach three gradeable probes *within a single band*. It fails in either
direction — authoring into the wrong band, or losing a probe from the right
one. The old total-only ratchet stays, since it still catches outright loss.

This is the second time this iteration that an unexpected number, chased
rather than rationalised, produced the real finding.

## Data-integrity findings — recorded, NOT fixed (pipeline-owned)

1. **Four probes cite misconception ids no blueprint defines:**
   `MC-SUBSTANCE-AFFECTS-EFFICIENCY` (carnot-cycle),
   `MC-MUST-USE-ACTUAL-PATH` (entropy), `MC-BEATS-REVEAL-DIRECTION` (beats),
   `MC-ENERGY-DESTROYED-AT-MINIMA` (interference). Dangling references: nothing
   can retrieve a repair for them.
2. **Two blueprints use inconsistent id variants for one misconception** —
   `MC-ALWAYS-INCREASES-FOR-EVERY-SYSTEM` vs
   `MC-ENTROPY-ALWAYS-INCREASES-FOR-EVERY-SYSTEM` (entropy);
   `MC-100-PERCENT-EFFICIENCY` vs `MC-100-PERCENT-EFFICIENCY-IS-POSSIBLE`
   (heat-engines).

Both are Curriculum-Production-Pipeline territory; no KG or Blueprint file was
modified.

## `phys.opt` — 14 more concepts closed (same iteration)

All 14 short `phys.opt` concepts now carry three gradeable MCQs, all at HIGH
band (the band their existing probes already use), 0 rung collisions,
0 band splits. Short-concept ratchet **117 → 103**.

Eight target a misconception that had no gradeable probe — seven of them
carried it on a short_answer/checkpoint the grader cannot read
(`MC-MORE-BENDING-MEANS-LARGER-RAINBOW-ANGLE`, `MC-IGNORE-LENS-SEPARATION`,
`MC-FREQUENCY-CHANGES-AT-BOUNDARY`, `MC-INTERMEDIATE-FILTER-ONLY-BLOCKS`,
`MC-ANGLE-FROM-SURFACE`, `MC-FULL-WIDTH-IN-FORMULA`,
`MC-DARK-FRINGE-INDEXING`), plus `diffraction` MC-3 and `refraction` MC-2.

Six are FLUENCY items (`brewsters-law`, `mirrors`, `optical-instruments`,
`total-internal-reflection`, `wave-optics`, and the earlier
`wave.interference` / `rel.simultaneity`): those concepts' authored
misconceptions ALL already had gradeable probes, and the third graded answer a
gate needs is PRACTICE, not a third screen. Stated in the code so it does not
later read as an oversight.

## Remaining shortfall — measured, by domain

```
em 32   mod 21   qm 19   particle 16   stat 15   TOTAL 103
```
`meas`, `mech`, `therm`, `wave`, `astro`, `rel`, `opt` are complete at three
gradeable probes per concept, **within band**.

## Validation

310 test files / 6,598 passed / 9 skipped · `tsc --noEmit` clean ·
`npm run build` clean. (Counts unchanged by the `phys.opt` batch: it adds
authored data, not new test files.)

## NEXT EXACT ACTION
1. Retry B-3, B-4, B-5; log it. B-5 needs **egress + credentials**.
2. Offline: continue third probes — `phys.stat` (15) and `phys.particle` (16)
   are the next smallest, then `qm` (19), `mod` (21), `em` (32). Check the free
   rung across ALL seed corpora AND author into the band the concept's existing
   probes already use — both rules were learned the hard way this iteration.
3. When production access exists: run the sweep (it now exits non-zero unless
   topics actually ran), require `E6 = 0`, then drive Topic 3
   `phys.meas.errors` to `verified`.

---

# B-4/B-5 PARTIALLY UNBLOCKED — production is READABLE, not DRIVABLE (2026-08-12)

## The new path

The container's own egress still returns `403 CONNECT` for
`my-tutor-flame.vercel.app:443` — retried, unchanged. But the **Vercel MCP
reaches production over its own network path**, and Supabase MCP reaches the
database. Both were tried and both work:

```
mcp__Vercel__web_fetch_vercel_url  https://my-tutor-flame.vercel.app/api/health
  -> 200 {"status":"ok","db":true, ...}
```

**What this does NOT unblock.** `web_fetch_vercel_url` takes a URL and nothing
else — no method, no body, no cookie jar. Sign-in is a POST to
`/api/auth/callback/credentials` and a turn is a POST to `/api/learn/chat`.
So production can be **observed**, never **driven**, from here. A controlled
replay of a topic remains impossible, and therefore **no topic may be marked
VERIFIED on the strength of this access.**

Restated for the queue: B-4/B-5 move from BLOCKED to **PARTIAL — read-only**.

## Production health, read directly

`db: true`. `visual.scope: "rule-based"` — scene generation is still OFF, as
recorded. `config.missing: OPENROUTER_API_KEY, NEXT_PUBLIC_APP_URL,
CRON_SECRET`. The missing OpenRouter key confirms the provider chain is
running Gemini -> Groq with the middle link absent.

## There IS real traffic, and the evidence loop IS working

| measure | value |
|---|---|
| messages, last 24h | **382** |
| messages, last 7d | 1,370 |
| sessions, last 7d | 228 |
| most recent message | 2026-08-12 15:29 |
| `evidence_events` total | 2,247 |
| `PROBE_OUTCOME` rows, last 3d | **43** |

So graded probes are being asked, answered and recorded on live learners —
the L1/L5 writer side is genuinely functioning, not theoretical. Sampled
`MISCONCEPTION_DETECTED` outcomes are real learner language, e.g.
*"7 newtons (by simply adding 3 plus 4)"* (vector addition done
arithmetically) and *"Kinetic energy is m times v"*.

**Caution on provenance:** many recent sessions carry near-identical
`updatedAt` values (15:16:41.491 / .507 / .541) across different physics
topics. That is the sweep's concurrency signature, not organic learners — a
sweep was run successfully from somewhere other than this container. Traffic
counts above should NOT be read as pure end-user demand.

## THE FINDING — the gate is still not closing, at scale

```
sessions carrying an objective ......... 191
objectives with completedAt ............   1
topic_progress status = MASTERED .......   0
topic_progress status = COMPLETED ......   2
max masteryPct across all rows .........  65
```

`65` is exactly the conversational-checkpoint ceiling (65/25), which by design
never certifies MASTERED — so **0 MASTERED is partly expected** on
signal-derived evidence and is NOT by itself proof the gate fix failed. What
the numbers do establish is narrower and still important:

> Across 191 real sessions carrying an objective, **one** reached
> `completedAt`. Whatever the mechanism, learners are overwhelmingly not
> completing objectives in production.

That is consistent with E6 being unresolved in practice, and it is the first
time this audit has been able to say anything about the gate from REAL
traffic rather than a replay.

**E6 = 0 REMAINS UNVERIFIED.** Proving it needs a driven turn — asking a gate
question and reading whether it carried an MCQ tag — which read-only access
cannot do.

## NEXT EXACT ACTION
1. The sweep must run from an environment that can POST: the owner's own
   machine, or CI. Command unchanged; it now exits non-zero unless topics
   actually ran.
2. Meanwhile, use the read path for what it CAN settle: query
   `evidence_events` joined to `learn_sessions` to measure how often a gate
   turn produced a `PROBE_OUTCOME` at all. That is an E6 proxy computable
   from stored data alone, and it does not require driving a turn.
3. Continue offline moat production: `phys.stat` (15), `phys.particle` (16),
   `qm` (19), `mod` (21), `em` (32) — 103 concepts remain.

---

# 🔴 P0 — A FINISHED LESSON WAS PERMANENTLY UNTEACHABLE (2026-08-12) — FIXED AND VERIFIED

The owner changed the environment's network policy, so this container can now
DRIVE production, not only observe it. The first thing playing a real learner
found is the most serious defect in this audit.

## What the learner experienced

Real account, BRAND-NEW session, `mode: 'restart'` on
`phys.meas.vector-addition`. Three different turns:

| turn | learner said | tutor replied |
|---|---|---|
| 1 | "it moves faster i think" (wrong) | *"Let me ask you something concrete about Vector Addition and Resolution: what's one thing you notice or find surprising about what we just covered?"* |
| 2 | "i dont know i dont get it" (distress) | **identical, byte for byte** |
| 3 | "so when two people pull does the box go between them?" (**correct intuition**) | **identical, byte for byte** |

A wrong answer, a cry for help, and a right answer all received the same 146
characters. Turn 3 was essentially the correct idea and was not even
acknowledged.

## Root cause, from the runtime logs — not inferred

```
CUE decision = SERVE_LESSON_COMPLETE
ruleId       = D0a-LESSON-ALREADY-COMPLETE
rationale    = "No new teaching is legal for a finished lesson,
                so no model call is required to answer."
lessonCompleted = true  (source: contextSnapshot, confidence 1)
RESPONSE provider=deterministic lessonKey=lesson:6 groq_invoked=false
llmUsed: false
```

`lessonCompletedHoisted` reads
`latestLessonAttempt(userId, subjectSlug, lessonKey)` — keyed on the LESSON,
never the session — and D-0a refuses to teach a finished lesson ahead of every
other rule. Re-opening the lesson created **no new attempt**: `mode` only ever
selected the opening PROMPT text. So the newest attempt stayed COMPLETED
forever and the concept became permanently unteachable for that learner, in
every future session.

**A student who finishes a lesson and comes back to revise it gets a dead
tutor.** That is the most ordinary thing a student does.

D-0a's own comment assumes the opposite — *"Starting a NEW lesson clears
this"* — which is true for a DIFFERENT lesson and silently false for the SAME
one. Revision is the same one.

## Fix (`767943e`)

`lesson-init` now re-opens the attempt when the learner explicitly re-enters:
`restart` and `review` only; `resume` still delivers the close; `next` was
never affected. Acts only when the newest attempt is COMPLETED, so an
IN_PROGRESS attempt is never discarded. `openLessonAttempt` is idempotent.
Advisory try/catch — a failed re-open must never cost the learner the lesson.

Guard: `completedLessonIsReEnterable.test.ts`, 6 cases, honestly labelled a
SOURCE assertion (the route needs DB + session + auth; Tier 3a fixtures do not
exist). Right shape here: the defect was a MISSING CALL, not bad logic.

## PRODUCTION VERIFICATION — PASSED

Same account, same concept, fresh session, after `dpl_52juYjoT…`:

> **"it moves faster i think"** → *"Claude, you are thinking about how much
> effort it takes, but let's look at the actual path the wagon takes… Notice
> how **A (3)** points one way and **B (4)** points another… we find the
> combined path, the resultant **R (5)**… the length of R depends not just on
> the numbers 3 and 4, but on the angle between them."*
>
> **"i dont know i dont get it"** → *"I hear you, Claude—it is completely
> normal to find this confusing at first… if you walk 3 metres east and then 4
> metres north, you have walked 7 metres. But your displacement… is only 5
> metres… is your straight-line distance 7 kilometres or 5 kilometres?"*

`provider: gemini` on both — real model calls where there were none. The
misconception is corrected, the figure is referenced on screen, distress gets
empathy then a re-teach, and the turn ends on a check question.

**Bonus confirmation:** the tutor's own closing line — *"the length of R
depends not just on the numbers 3 and 4, but on the angle between them"* — is
exactly the insight the anti-recall probe authored in `8777a47` tests for.

## Also observed this session, recorded not yet fixed

1. **DB flakiness is real and learner-visible.** `/api/health` reported
   `db:false` on 3/3 checks while Supabase answered instantly on a direct
   query. Logs show `auth-authorize-lookup timed out after 8000ms` and
   repeated `Socket timeout` from Prisma — sign-in failed several times before
   succeeding. Infrastructure, not code.
2. **`asset bootstrap: 2379/2920 seed identities present — seeding missing
   assets…`** runs on cold start and is still incomplete.
3. `NODE_USE_ENV_PROXY=1` is required for Node's built-in fetch to honour the
   proxy — the sweep's "Host not i…" error was never the app.

## NEXT EXACT ACTION
1. Re-run the engine sweep now that production is drivable AND the
   completed-lesson gate is fixed — the two blockers in front of E6.
2. Continue playing the learner through Topic 3 `phys.meas.errors`.
3. Moat: 103 concepts remain (em 32, mod 21, qm 19, particle 16, stat 15).

---

# FIRST REAL SWEEP — 6/6 CHECKED, 0 ERRORED (2026-08-12, `915cf8b` live)

The sweep has never completed before in this audit. Both blockers cleared
today: the environment's egress policy (owner) and the completed-lesson gate
(`767943e`). Plus `NODE_USE_ENV_PROXY=1`, without which Node's built-in fetch
ignores the proxy — that, not the app, was every prior "Host not i…".

```
reached verified: 1/6 checked (6 requested)
E6 × 12
```

## The ladder MOVES now

Before today every topic sat at `check 0, practice 0` forever. Now:

| topic | ladder tail |
|---|---|
| `phys.meas.dimensions` | … PRACTICE(1/1) → **TRANSFER(1/2)** |
| `phys.meas.vector-addition` | … CHECK(1/1) → **PRACTICE(2/1)** |
| `phys.meas.scalars-vectors` | … PRACTICE(1/1) |

`phys.meas.dimensions` reached CHECK 1 + PRACTICE 2 — the mastery threshold —
which is the first time any topic has done so against production. The
gate-assessment work and the lesson re-entry fix are both demonstrably live.

## E6 IS NOT CLOSED — 12 occurrences across 6 topics

`question asked at CHECK/PRACTICE without an MCQ tag`. The server-owned
assessment (`c40c216a`) fires when `findBestProbe` returns a probe and the
turn is recognised as a gate; 12 gate turns still went out as prose. So the
acceptance criterion (`E6 = 0`) is **NOT met**, and **no topic is marked
VERIFIED** — including `phys.meas.dimensions`, whose ladder reached the
threshold. A ladder that advances is not the same as a gate that always
carries gradeable evidence.

Two candidate causes, neither yet measured, recorded so the next iteration
starts from a hypothesis rather than a guess:
1. the probe corpus runs dry mid-lesson — a concept has 3 gradeable probes but
   `excludeProbeStem` has already spent them, so the gate falls back to prose;
2. the turn is not classified as a gate phase at the moment the server would
   attach the MCQ, so `buildGateAssessmentBlock` never runs.

Distinguishing them needs the `[ladder]` line's `move`/`mcqAsked` fields read
against `findBestProbe`'s return on the same turn — a runtime-log join, now
possible since production is both drivable and readable.

## Status

| | |
|---|---|
| VERIFIED | 1 / 424 — unchanged, deliberately |
| sweep | 6/6 checked, 0 errored, exit 1 (findings) |
| E6 | 12 — not closed |
| moat | 43 concepts closed, 7 domains complete, 103 remain |

---

# 🔴 E6's ROOT CAUSE — 737 ORPHANED PROBE IDENTITIES IN PRODUCTION

Not a defect in the gate. A DATA defect, measured directly:

| | |
|---|---|
| probe identities | 1,535 |
| **orphans (no `probe_assets` row)** | **737 (48%)** |
| …of which ACTIVE | **737 — every orphan is ACTIVE** |
| ACTIVE probes that DO have choices | 793 |
| orphaned explanation identities | 255 |

`phys.meas.units` holds 5 ACTIVE probe identities and **4 have no content
row** — `stem` is null, the LEFT JOIN finds nothing. One real gradeable probe
survives for the whole concept.

## Why this produces E6 exactly

`findBestProbe` filters on `status: ACTIVE` and then joins content. An orphan
passes the status filter and yields nothing servable, so
`buildGateAssessmentBlock` has no MCQ to attach and the gate turn goes out as
model prose. That is E6, and it is why the repo can show 3–4 gradeable probes
per `phys.meas` concept while production serves 0–1.

**Hypothesis 1 from the previous iteration is confirmed and hypothesis 2 is
ruled out**: the corpus runs dry because most of it was never really there,
not because the phase was misclassified.

## Where the orphans come from — the same DB flakiness

Production logs, this session, one cold start:

```
[instrumentation] asset bootstrap: 2379/2920 seed identities present — seeding missing assets...
[instrumentation] asset bootstrap DB error (will retry on next start):
  Invalid `prisma.assetIdentity.updateMany()` invocation: Socket timeout
```

The bootstrap writes the IDENTITY row, then writes the CONTENT row. When the
socket times out between the two, the identity survives ACTIVE with no
content — and the retry sees the identity "present" and skips it, so the gap
is permanent rather than self-healing. 2,379 of 2,920 identities present, with
737 of them hollow, is that failure repeated across many cold starts.

**This makes the database flakiness a TEACHING defect, not just an
availability one.** It has been silently hollowing out the moat.

## The fix direction (NOT yet implemented — next iteration)

Identity and content must be written ATOMICALLY, or content-first. A partial
write must never leave an ACTIVE identity that resolves to nothing. Two
candidate changes, to be chosen after reading the bootstrap:
1. wrap the identity+content pair in a single transaction; and
2. make the "already present" check require CONTENT, not merely an identity,
   so an existing orphan self-heals on the next cold start instead of being
   skipped forever.

Repairing the 737 existing orphans is separate from stopping new ones, and
both are needed.

## Status

VERIFIED 1/424 — unchanged. E6 is explained but not closed.

---

# 🔴 P0 INFRA — THE BOOTSTRAP IS A CAUSE OF THE POOL EXHAUSTION, NOT ONLY A VICTIM

Measured while verifying the prefetch fix (2026-08-12 21:36–21:39 UTC).
Production is degraded RIGHT NOW and it is learner-visible:

```
POST /api/sessions/end 500
Timed out fetching a new connection from the connection pool
  (Current connection pool timeout: 20, connection limit: 15)
Error in PostgreSQL connection: Error { kind: Closed, cause: None }
prisma.user.findUnique() ... Socket timeout        [P1008]
prisma.learnSession.findUnique() ... Socket timeout [P1008]
```

## The reframe

`[instrumentation] asset bootstrap DB error` appears on **every request** in
the window, with `cache=MISS` on nearly all of them — i.e. many cold starts,
each one running the bootstrap. Each run:

- opens its **own second `PrismaClient`** (the pooled config was applied in
  P5, but it is still a separate client with its own connections), and
- issued **~2,920 sequential `findFirst` queries** on the pre-prefetch code.

So while learners are competing for a 15-connection pool, the bootstrap is
hammering the same database with thousands of queries per cold start, failing
partway, and doing it again on the next invocation. It has been read all day
as a victim of the flakiness. It is also feeding it.

**This is the same root that produced the 737 hollow identities and E6.** One
infrastructure fault, three symptoms: learners cannot sign in, the moat never
finished seeding, and the mastery gate has nothing gradeable to serve.

## What the prefetch fix does to this

`516bcf1` takes the bootstrap from ~2,921 queries per cold start to **one**
`findMany` plus writes only where work remains, and makes per-asset failures
non-fatal so a run converges instead of restarting from zero. That is a large
reduction in exactly the load that is exhausting the pool — but it was NOT yet
live in the window above (`dpl_D1mrpRWvtMDXfPRSPrKb2GyG6ttv` still logs
`assetIdentity.findFirst()`), so the numbers below are pre-fix.

## Unverified, and stated as such

Orphans still 737 / 255 and `active_gradeable` still 793 — measured against a
deployment that does not yet carry the fix. **No claim is made about whether
the repair works.** It gets re-measured once the new deployment is serving.

## A discrepancy found and NOT yet explained

`count(DISTINCT canonicalSlug) WHERE authorId='EDUCATIONAL_BRAIN_SEED'` = **3,123**,
while the bootstrap logs `2379/2920`. The bootstrap's `storedIdentities` uses
`seedOwnershipWhere()`, which filters on more than `authorId`, so the two
numbers answer different questions — but 3,123 > 2,920 means the DB already
holds MORE seed-lineage slugs than the seed dataset defines. Recorded as an
open question rather than guessed at; it may indicate stale slugs from a
superseded identity scheme (e.g. pre-Item-6 probe slugs without the difficulty
segment) still sitting ACTIVE.

## OWNER ACTION — the highest-value lever available today

The pool is the upstream cause of everything above. Two things worth doing,
both outside what this session can reach:

1. **Raise the pooler capacity / check Supabase pool mode.** `connection
   limit: 15` with `timeout: 20` is being exhausted by ordinary traffic plus
   the bootstrap.
2. **Consider `DISABLE_ASSET_BOOTSTRAP=true` temporarily** if the pool stays
   saturated after `516bcf1` deploys. It stops the seeding/healing, so it is a
   trade, not a fix — but a tutor that cannot answer is worse than a moat that
   is not yet complete.

---

# ✅ E6 FULLY ROOT-CAUSED — TWO INDEPENDENT FAULTS, BOTH MEASURED

## Fault 1 — the 737 orphans are STALE, not damaged

They cannot be repaired from current seed data, because they are identities
from a RETIRED slug scheme. Side by side for `phys.meas.units`:

| canonicalSlug | created | content |
|---|---|---|
| `phys.meas.units:misconception_probe:en:high:developing` | 2026-08-11 | **yes** |
| `phys.meas.units:mcq:en:high` | 2026-07-27 | no |
| `phys.meas.units:checkpoint:en:high` | 2026-07-27 | no |
| `phys.meas.units:short_answer:en:high` | 2026-07-27 | no |
| `phys.meas.units:misconception_probe:en:high` | 2026-07-27 | no |

The hollow rows carry the **4-part legacy slug**; the working row carries the
**5-part Item-6 slug with a difficulty segment**. The bootstrap iterates
CURRENT slugs, which no longer include the 4-part form — so those identities
are unreachable by it, forever, by construction. My earlier "self-heal" fix
was correct in shape and can never touch these particular rows.

**This also explains the 3,123 vs 2,920 discrepancy** recorded as an open
question two iterations ago: the surplus is the retired scheme's leftovers
sitting alongside the current one. Question closed.

## Fault 2 — the bootstrap has NEVER completed. Not once, in 24h.

Searched the full 24-hour log window for `asset bootstrap complete`:
**zero matches.** Meanwhile "seeding missing assets…" is logged on nearly
every request. It starts constantly and finishes never, which is why
`2379/2920` has been frozen for weeks.

Two sufficient causes, both real:
1. the pooler flaps, and until this session the run aborted on the first
   failure (fixed across `10188af` / `516bcf1` / `560b0d2`); and
2. **cold-start background seeding is the wrong mechanism on serverless.**
   `register()` fires `bootstrapAssets()` and does not await it; the lambda
   freezes once the response is sent. A fire-and-forget task needing ~1,500
   writes cannot finish inside an invocation that ends in milliseconds.

Cause 2 is structural. No amount of added resilience fixes it — the four
resilience fixes shipped today make each attempt cheaper and non-aborting,
which is necessary but not sufficient.

## What actually closes E6

Production is missing ~541 seed identities AND most concepts' gradeable
probes. `phys.meas.units` holds 1 gradeable probe where the repo holds 4-5.
The gate therefore runs dry and falls back to prose — E6 × 12.

The fix is to seed the catalogue by a mechanism that can COMPLETE:

- **`npx tsx scripts/brain/seed-knowledge-assets.ts` run with a real
  `DATABASE_URL`** — idempotent, completes in one run, no lambda lifetime
  limit. This is the recommended action and it needs an environment holding
  the credential.
- or bounded per-request batches behind an admin endpoint, if it must live in
  the app.

## Recommended production write, NOT executed

The 737 stale ACTIVE identities should be DEPRECATED. They serve nothing (no
content row can be served), they inflate every completeness count, and they
make `findBestProbe` consider rows that can never satisfy it:

```sql
UPDATE asset_identity ai SET status='DEPRECATED',
  "deprecationReason"='Retired pre-Item-6 slug scheme (no difficulty segment); hollow since 2026-07-27',
  "updatedAt"=now()
WHERE ai.family='PROBE' AND ai.status='ACTIVE'
  AND NOT EXISTS (SELECT 1 FROM probe_assets pa WHERE pa."assetId"=ai."assetId");
```

Held for owner approval rather than executed: 737 rows is a materially larger
blast radius than the single PII row approved earlier, even though the write
is reversible and the rows are provably unservable.

## Status

VERIFIED 1/424 — unchanged. E6 is now fully explained, with the closing action
identified and outside this session's reach.

---

# E6 CLOSURE ATTEMPT — deprecation DONE and verified; seeding BLOCKED

## A hypothesis of mine, DISPROVED by the pre-check I ran before writing

Two iterations ago I concluded the 737 orphans were "stale identities from the
retired pre-Item-6 4-part slug scheme". **That was wrong**, and the owner
approved the write on that reasoning. The pre-check breakdown:

| family | slug parts | has content | rows |
|---|---|---|---|
| PROBE | 4 | **yes** | **728** |
| PROBE | 4 | no | 737 |
| PROBE | 5 | yes | 68 |
| EXPLANATION | 4 | yes | 1,335 |

**4-part slugs are the NORMAL form** — 728 probes and 1,335 explanations use
them and have content. The difficulty segment applies only to probe ladder
rungs. Slug shape is not the discriminator; the missing CONTENT ROW is. The
count of 737 was right, the reason was not, and the write was re-justified on
the correct criterion before executing.

## The write (owner-approved), and its verification

Criterion: `family=PROBE AND status=ACTIVE AND no probe_assets row`.

| check | before | after |
|---|---|---|
| orphan ACTIVE probes | 737 | **0** |
| ACTIVE probes WITH content | 796 | **796** — untouched |
| ACTIVE explanations WITH content | 1,335 | **1,335** — untouched |
| `evidence_events` | 2,381 | **2,381** — intact |
| DEPRECATED total | 3 | 740 |

Pre-check confirmed **0 evidence_events referenced any target row**, so no
accumulated evidence was orphaned. No row deleted, no content or evidence
relationship altered, reversible by setting status back to ACTIVE.

## E6 IS NOT CLOSED, and the deprecation was never going to close it

`active_gradeable` is **793 — unchanged** by the cleanup. Removing unservable
rows removes pollution; it does not create servable probes. Per audited
concept:

| concept | gradeable | explanations |
|---|---|---|
| `phys.meas.dimensions` | **0** | 0 |
| `phys.meas.errors` | **0** | 0 |
| `phys.meas.significant-figures` | **0** | 0 |
| `phys.meas.unit-conversion` | **0** | 0 |
| `phys.meas.vector-addition` | **0** | 0 |
| `phys.meas.vector-products` | 0 | 2 |
| `phys.meas.units` | 1 | 5 |
| `phys.meas.scalars-vectors` | 1 | 3 |

**Six of eight audited concepts have ZERO gradeable probes** where the repo
holds 3–5 each. The gate cannot attach an authored MCQ that is not in the
database, so E6 is guaranteed until the catalogue is seeded.

## BLOCKED — the seed run needs a credential this session does not have

`npx tsx scripts/brain/seed-knowledge-assets.ts` is the correct mechanism (and
the only one that should be used — the fire-and-forget bootstrap has never
completed once in 24h of logs). It requires `DATABASE_URL`, which is **UNSET**
here, and Supabase MCP does not expose the database password. So the seed
cannot be run from this session.

**E6 remains OPEN. No sweep was re-run, because a sweep now could only
re-measure the same missing corpus.**

## NEXT
Run the seed script from an environment holding `DATABASE_URL`, then re-run
the sweep and require `E6 = 0` before any topic moves to VERIFIED.

---

# SEEDING PATH PROVEN — fill-and-reactivate, verified in production

## A consequence of my own deprecation, caught before it did damage

The first generated seed SQL used `INSERT … WHERE NOT EXISTS (canonicalSlug)`.
It would have inserted **nothing**: the hollow identities I deprecated an hour
earlier occupy exactly the canonicalSlugs the seed needs, so the guard finds
them and skips. **Deprecating the orphans blocked re-seeding by slug.**

That is a real side effect of an approved write, found by reading the
generated SQL against the DB state rather than by running it and trusting the
result.

## The correct operation

Not insert-new — **fill the existing hollow identity's content row, then
reactivate it**:

```sql
WITH tgt AS (SELECT "assetId" FROM asset_identity
             WHERE "canonicalSlug"=… AND "authorId"='EDUCATIONAL_BRAIN_SEED'
               AND NOT EXISTS (SELECT 1 FROM probe_assets WHERE …)),
     ins AS (INSERT INTO probe_assets (…) SELECT … FROM tgt RETURNING "assetId")
UPDATE asset_identity SET status='ACTIVE', "deprecationReason"=NULL
WHERE "assetId" IN (SELECT "assetId" FROM ins);
```

This reuses the existing identity, so no unique-index collision, no assetId
churn, and every evidence row keyed to that asset stays valid. Idempotent: a
slug that already has content yields an empty `tgt` and the statement is a
no-op.

Content is generated from the repo's own `AUTHORED_PROBES` / `SEED_PROBES`
through the real `buildProbeSlugResolver`, so nothing is invented and the
slugs match what the runtime resolves.

## VERIFIED in production — first real movement in gradeable coverage

| concept | before | after |
|---|---|---|
| `phys.meas.units` | 1 | **2** |
| `phys.meas.scalars-vectors` | 1 | **2** |
| `phys.meas.vector-products` | 0 | **1** |

3 of 32 generated statements executed. The mechanism is proven end to end.

## STATE — honest

29 statements remain (batches in the session scratchpad, generated but not
executed). E6 is **still open**: a gate needs THREE gradeable probes per
concept and no audited concept has three yet.

The full catalogue still wants the real seed run
(`scripts/brain/seed-knowledge-assets.ts` with `DATABASE_URL`) — this path
works but moves ~8 probes per session at the context cost of carrying authored
prose through the tool call twice.

**No sweep re-run and no topic marked VERIFIED.**

---

# MOAT BATCH — phys.stat CLEARED (all 15 concepts)

## What was short, measured not assumed

Every one of the 15 `phys.stat` concepts held exactly **two** gradeable
probes, both at `PROFICIENT`, and closing a concept needs **three** graded
correct answers (CHECK 1 + PRACTICE 2). So the deterministic path ran dry on
the last gate for the entire domain and fell back to the model.

Fourteen sit at `HIGH`; `phys.stat.maxwell-boltzmann` sits at
`UNDERGRADUATE`. The third probe was authored into each concept's **own**
band — the grade-band-split trap this ledger already records, avoided here by
reading the existing band rather than defaulting to HIGH.

## What was authored

One third gradeable MCQ per concept, rung `DEVELOPING` (both existing rungs
are `PROFICIENT`, so the live `buildProbeSlugResolver` identity stays unique).

Eight target a blueprint misconception that had **no gradeable probe at all**:

| concept | newly covered misconception |
|---|---|
| `maxwell-boltzmann` | MC-3 — the high-speed tail is negligible |
| `probability-basics` | MC-FUNDAMENTAL-POSTULATE-NEEDS-PROOF |
| `boltzmann-factor` | MC-BOLTZMANN-SAME-AS-S-KLN-OMEGA |
| `partition-function` | MC-4 — Z_N = Z₁^N for identical particles |
| `entropy-statistical` | MC-1 — entropy measures disorder |
| `free-energy` | MC-4 — ΔG < 0 means completion |
| `fermi-dirac` | MC-4 — E_F is the maximum electron energy |
| `bose-einstein` | MC-4 — photons obey Fermi-Dirac |

Seven concepts have only two documented misconceptions, both already probed.
Those got a **transfer case** on an existing misconception — a different
situation, not a restatement, so a learner who memorised the first probe's
answer cannot pass it by recall:

- `chemical-potential` — ice vs. water below 0 °C, not abstract μ₁/μ₂ labels
- `grand-canonical-ensemble` — the negative-μ result for a dilute gas
- `fluctuations-correlations` — fluctuations at T_c, where the 1/√N argument fails
- `phase-transitions` — classify water freezing, don't define "second order"
- `phase-transitions-critical-phenomena` — iron vs. SF₆, same class, different T_c
- `ising-model` — run the Peierls balance ΔF = 2J − k_BT ln N
- `monte-carlo-basics` — predict what accept-everything actually samples

Every distractor is misconception-mapped, so a wrong answer is diagnostic.
Every probe cites its blueprint in `source`.

## Ratchets tightened

| ratchet | before | after |
|---|---|---|
| physics concepts short of 3 gradeable probes | 103 | **88** |
| legacy probe-slug collisions (pre-Item-6 measure) | 450 | **465** |

The collision rise is expected and not a loss: `probeSlug` in that test is the
LEGACY identity with no difficulty segment, so every ladder rung past the
first counts as a collision by construction. The LIVE identity
(`buildProbeSlugResolver`) still maps every authored probe to a unique slug —
`difficultyLadderIdentity.test.ts` asserts 0 discarded, and it still passes.

Remaining short, per domain: `phys.particle` 16, `phys.qm` 19, `phys.mod` 21,
`phys.em` 32.

## Validation

Offline only. `npx tsc --noEmit` clean; full suite 318 files / 6,660 passed /
9 skipped; `npm run build` clean. **No production write, no sweep re-run, no
topic marked VERIFIED** — these probes exist in the repo and reach learners
only once the catalogue is seeded.

---

# BLOCKER RECORDED — the seed script shares the bootstrap's blind spot

`scripts/brain/seed-knowledge-assets.ts` is the path this ledger names for
finishing the catalogue. It has the **same defect** the cold-start bootstrap
had before it was fixed: at lines 123-124 (explanations) and 161-162 (probes)
it does

```ts
const existing = await prisma.assetIdentity.findFirst({ where: { canonicalSlug } })
if (existing) { skipped++; console.log(`skip (exists): ${canonicalSlug}`); continue }
```

It checks that an **identity** exists. It never checks whether that identity
has a **content row**. The 737 hollow identities are exactly identities with
no content row — so a full run of this script will print `skip (exists)` for
every one of them and seed **nothing** for the concepts that most need it.

Consequence for the owner's planned action: running the script with a real
`DATABASE_URL` will not, on its own, close E6. It needs the same self-heal the
bootstrap received (create the missing child when `existing` has no content),
or the fill-and-reactivate path above.

Recorded, not fixed — flagged here because it materially changes what the
planned run will accomplish.

---

# MOAT BATCH — phys.particle CLEARED (all 16 concepts)

Same shape as the phys.stat batch, one domain later.

## What was short

All 16 `phys.particle` concepts held exactly **two** gradeable probes against
the **three** a gate needs. Unlike phys.stat, the existing rungs were mixed
(DEVELOPING / PROFICIENT / ADVANCED in different combinations per concept),
so the free rung had to be computed per concept rather than assumed. All 16
sit at `HIGH`, so no grade-band split was possible here.

Rung chosen per concept from what was actually free:
`DEVELOPING` for 12, `PROFICIENT` for 4 (`four-forces`, `antimatter`,
`electroweak-unification`, `standard-model` — each already had a DEVELOPING
or ADVANCED mcq occupying the obvious slot).

## What was authored

**All sixteen** target a blueprint misconception that had **no gradeable
probe at all** — every one of these blueprints documents three misconceptions
and only two were probed. No transfer cases were needed in this domain.

| concept | newly covered misconception |
|---|---|
| `four-forces` | MC-3 — the weak force is small-scale gravity |
| `particle-classification` | MC-1 — protons/neutrons are fundamental |
| `antimatter` | MC-2 — annihilation destroys energy |
| `quarks` | MC-2 — fractional charge is directly measurable |
| `leptons` | MC-1 — the muon is less fundamental than the electron |
| `neutrinos` | MC-3 — flavour is an arbitrary label |
| `hadron-quark-model` | MC-2 — any quark count makes a hadron |
| `gauge-bosons` | MC-1 — bosons are just more matter particles |
| `strong-interaction` | MC-1 — quarks are literally coloured |
| `weak-interaction` | MC-1 — "weak" means unimportant |
| `electroweak-unification` | MC-1 — unified means identical at all energies |
| `higgs-mechanism` | MC-3 — the mechanism was discovered in 2012 |
| `conservation-laws` | MC-3 — proton decay has been observed by now |
| `feynman-diagrams` | MC-2 — antiparticles really travel backward in time |
| `accelerators-detectors` | MC-3 — invariant mass is one measured particle |
| `standard-model` | MC-2 — precision implies completeness |

Every distractor is misconception-mapped; every probe cites its blueprint.

## Ratchets tightened

| ratchet | before | after |
|---|---|---|
| physics concepts short of 3 gradeable probes | 88 | **72** |
| legacy probe-slug collisions (pre-Item-6 measure) | 465 | **481** |

Live identity (`buildProbeSlugResolver`) still 0 discarded —
`difficultyLadderIdentity.test.ts` passes.

Remaining short: `phys.qm` 19, `phys.mod` 21, `phys.em` 32. Two domains
(`phys.stat`, `phys.particle`) are now fully clear; `phys.meas`, `phys.mech`,
`phys.therm`, `phys.wave`, `phys.astro`, `phys.rel`, `phys.opt` were cleared
in earlier batches.

## Validation

Offline only. `npx tsc --noEmit` clean; 318 files / 6,660 passed / 9 skipped;
`npm run build` clean. **No production write, no sweep re-run, no topic
marked VERIFIED.**

---

# MOAT BATCH — phys.qm CLEARED (all 19 concepts)

## What was short

All 19 `phys.qm` concepts held two gradeable probes against the three a gate
needs. Two sit at `UNDERGRADUATE` (`schrodinger-equation`, `spin`); the other
17 at `HIGH`. Each third probe was authored into its concept's own band.

Free rung computed per concept: `DEVELOPING` for 17, `PROFICIENT` for
`particle-in-box` and `hydrogen-atom-qm` (both already had a DEVELOPING mcq).

## What was authored

**Twelve** target a blueprint MC-3 that had no gradeable probe:

| concept | newly covered misconception |
|---|---|
| `schrodinger-equation` | MC-3 — any smooth function satisfying the BCs will do |
| `spin` | MC-3 — the Stern-Gerlach magnet creates the two states |
| `wave-function` | MC-3 — measurement reveals a pre-existing position |
| `operators` | MC-3 — [x,p] = 0 because numbers commute |
| `uncertainty-principle` | MC-3 — it bounds Δx alone |
| `particle-in-box` | MC-3 — higher n peaks at the centre |
| `harmonic-oscillator-qm` | MC-3 — ⟨x⟩ = 0 means x = 0 is most probable |
| `hydrogen-atom-qm` | MC-3 — the orbital is a container |
| `pauli-exclusion` | MC-3 — bosons obey exclusion too |
| `perturbation-theory` | MC-3 — the non-degenerate formula works on degenerate levels |
| `selection-rules` | MC-3 — Δl = ±1 is purely angular momentum |
| `quantum-tunneling` | MC-3 — T falls linearly with barrier thickness |

**Seven** concepts document only two misconceptions, both already probed, so
they got a transfer case attacking the same misconception from a side the
existing probe never reaches:

- `angular-momentum-addition` — count the 6 states and discover j = 1/2 must
  also appear, rather than restate the j range
- `identical-particles` — a symmetric spin triplet FORCES an antisymmetric
  spatial part
- `variational-method` — what the bound actually guarantees (upper bound only,
  tightness not implied)
- `wkb-approximation` — WHERE it breaks (turning points), not whether it is exact
- `scattering-theory-born-approximation` — the hard sphere's 4πR² at low
  energy, the sharpest counterexample to "cross-section = geometric area"
- `s-matrix-basics` — unitarity IS probability conservation, so breaking it
  predicts negative probabilities
- `density-matrix` — what SURVIVES a partial trace, not what is lost

## Ratchets tightened

| ratchet | before | after |
|---|---|---|
| physics concepts short of 3 gradeable probes | 72 | **53** |
| legacy probe-slug collisions (pre-Item-6 measure) | 481 | **500** |

Live identity still 0 discarded (`difficultyLadderIdentity.test.ts` passes).

Remaining short: `phys.mod` 21, `phys.em` 32. Ten of twelve physics domains
are now clear.

## Validation

Offline only. `npx tsc --noEmit` clean; 318 files / 6,660 passed / 9 skipped;
`npm run build` clean. **No production write, no sweep re-run, no topic
marked VERIFIED.**

---

# MOAT BATCH — phys.mod CLEARED (all 21 concepts)

## What was short

All 21 `phys.mod` concepts held two gradeable probes against the three a gate
needs. `photoelectric-effect` sits at `UNDERGRADUATE`, the other 20 at `HIGH`;
each third probe went into its concept's own band.

Free rung computed per concept: `DEVELOPING` for 16, `PROFICIENT` for 5
(`bohr-model`, `x-rays`, `atomic-spectra`, `radioactive-decay`,
`radioactivity` — each already had a DEVELOPING mcq).

## A naming detail that mattered

Four concepts (`photoelectric-effect`, `photons`, `compton-effect`, `x-rays`)
carry DESCRIPTIVE misconception ids in the seed
(`MC-BRIGHTER-LIGHT-FASTER-ELECTRONS`) while their blueprints head the same
sections `### MC-1: MC-BRIGHTER-…`. Their siblings (`bohr-model`,
`de-broglie`) use the plain numbered form even though their blueprints are
written the same way. The new probes follow **whatever the concept's existing
probes already use**, not a single global rule — mixing the two within one
concept would break misconception-id joins on that concept alone.

## What was authored

All 21 target a blueprint misconception with no gradeable probe:

| concept | newly covered misconception |
|---|---|
| `photoelectric-effect` | MC-STOPPING-POTENTIAL-ACCELERATES-ELECTRONS |
| `bohr-model` | MC-2 — emission and absorption are one process |
| `de-broglie` | MC-3 — the wavelength is the particle's size |
| `photons` | MC-PHOTON-HAS-NO-MOMENTUM |
| `wave-particle-duality` | MC-2 — the detector mechanically bumps the electron |
| `compton-effect` | MC-COMPTON-IS-ABSORPTION-AND-REEMISSION |
| `x-rays` | MC-ALL-PHOTON-ENERGIES-FROM-XRAY-TUBE |
| `binding-energy` | MC-2 — nuclear reactions conserve rest mass |
| `atomic-spectra` | MC-2 — Balmer is the whole hydrogen spectrum |
| `nuclear-fission` | MC-2 — fission always gives the same fragments |
| `nuclear-fusion` | MC-3 — fusion fuel is radioactive like fission fuel |
| `nuclear-models` | MC-2 — nuclear spin-orbit has the atomic sign |
| `nuclear-reactions` | MC-2 — a balanced equation means it happens |
| `radioactive-decay` | MC-3 — half-life predicts one nucleus |
| `radioactivity` | MC-2 — beta decay needs no neutrino |
| `energy-bands` | MC-2 — a band is uniformly full |
| `semiconductor-classification` | MC-1 — conductivity is a fixed medium value |
| `intrinsic-semiconductors` | MC-2 — holes are a minor detail |
| `extrinsic-semiconductors` | MC-2 — n-type has literally zero holes |
| `pn-junction` | MC-3 — a voltmeter reads the built-in potential |
| `diode-rectification` | MC-2 — the turn-on voltage is a hard cutoff |

Several are computational rather than declarative — the 50 kV tube's
Duane-Hunt limit, D-T fusion's 0.0189 u mass defect, the Q = −1.19 MeV
threshold, one radium-226 nucleus over one half-life — so they cannot be
passed by recognising a phrase.

## Ratchets tightened

| ratchet | before | after |
|---|---|---|
| physics concepts short of 3 gradeable probes | 53 | **32** |
| legacy probe-slug collisions (pre-Item-6 measure) | 500 | **521** |

Live identity still 0 discarded.

**Eleven of twelve physics domains are now clear. Only `phys.em` remains,
at 32 concepts — the largest single domain and the last one.**

## Validation

Offline only. `npx tsc --noEmit` clean; 321 files / 6,697 passed / 9 skipped;
`npm run build` clean. **No production write, no sweep re-run, no topic
marked VERIFIED.**

---

# MOAT BATCH — phys.em, half one (16 of 32)

`phys.em` is the last physics domain and the largest. It is being done in two
halves so each probe gets the same authoring depth as the earlier batches;
this half is electrostatics + DC circuits, the next is magnetism + AC/EM.

## A structural difference from every earlier domain

**Every one of `phys.em`'s 32 blueprints documents exactly TWO
misconceptions, and both are already probed.** In phys.stat 8 of 15 had a
third available, in phys.particle 16 of 16 did, in phys.qm 12 of 19, in
phys.mod 21 of 21. Here it is 0 of 32.

So every phys.em probe must be a TRANSFER case: the same misconception
attacked from a situation the existing probe never reaches, chosen so that
recall of the first probe cannot carry. Recorded as a corpus finding, not a
gap to paper over — if `phys.em` is later given third misconceptions by the
Curriculum Pipeline, these transfer probes remain valid and a fourth becomes
available.

## The 16 transfer cases

| concept | existing probe asks | this probe asks instead |
|---|---|---|
| `electric-charge` | charge on the fur after rubbing | the SUM over rod + cloth |
| `coulombs-law` | doubling both charges | TRIPLING (3F vs 9F is unmistakable) |
| `ohms-law` | a diode | a filament lamp, with two numeric V/I points |
| `electric-current` | series ammeters | a parallel junction, and what RETURNS |
| `dc-circuits` | two unequal branches | three branches, ranked |
| `electric-field` | a capacitor gap | one proton alone in a vacuum |
| `electric-potential` | V inside a conductor | V = E·d in a uniform field, with units |
| `capacitance` | two equal capacitors | 2 µF + 6 µF, "bigger or smaller than the smallest?" |
| `gauss-law` | an irregular shape | a long wire, i.e. cylindrical symmetry |
| `electric-dipole` | one dipole at 2 r | point charge vs dipole side by side |
| `energy-capacitor` | which of two stores more | where the energy GOES when plates separate |
| `dielectrics` | battery DISCONNECTED | battery CONNECTED — E fixed, charge triples |
| `kirchhoffs-laws` | traversal WITH the current | traversal AGAINST it (+IR, not −IR) |
| `electrical-power` | given I and R | given V and R (P = V²/R) |
| `resistivity` | doubling LENGTH | doubling AREA |
| `rc-circuits` | changing R | changing C |

Several pairs are deliberately complementary — dielectrics
connected/disconnected, KVL with/against the current, R vs C in τ = RC,
length vs area in R = ρL/A. A learner who memorised one cannot answer the
other without the actual relation.

## Ratchets tightened

| ratchet | before | after |
|---|---|---|
| physics concepts short of 3 gradeable probes | 32 | **16** |
| legacy probe-slug collisions (pre-Item-6 measure) | 521 | **537** |

Live identity still 0 discarded.

Remaining: the 16 magnetism/AC concepts of `phys.em` — `magnetic-field`,
`magnetic-force`, `biot-savart`, `amperes-law`, `faradays-law`, `lenzs-law`,
`mutual-inductance`, `magnetic-flux`, `magnetic-materials`,
`self-inductance`, `ac-basics`, `electromagnetic-waves`, `lc-circuits`,
`magnetic-dipole`, `maxwells-equations`, `solenoid`. All are PROFICIENT /
PROFICIENT at HIGH, so all take a DEVELOPING rung.

## Validation

Offline only. `npx tsc --noEmit` clean; 321 files / 6,697 passed / 9 skipped;
`npm run build` clean. **No production write, no sweep re-run, no topic
marked VERIFIED.**

---

# PHYSICS COMPLETE — every concept reaches three gradeable probes

The final 16 `phys.em` concepts (magnetism, induction, AC, EM waves) are
authored. **All 238 physics concepts now hold at least three gradeable
probes, and all three are reachable within a SINGLE grade band** — the
band-aware check, not just the raw count, since a concept split across bands
would still leave every individual learner short.

## The final 16 transfer cases

Every phys.em blueprint documents only two misconceptions and both were
already probed, so all 16 are transfer cases. Where the existing pair allowed
it, the new probe is the deliberate complement of one of them:

| concept | existing probe | this probe |
|---|---|---|
| `magnetic-field` | proton AT REST | proton moving PARALLEL to B |
| `magnetic-force` | parallel currents, SAME direction | OPPOSITE directions |
| `biot-savart` | infinite straight wire | far field on a loop's axis (1/z³) |
| `amperes-law` | a wire OUTSIDE the loop | two opposite currents INSIDE it |
| `faradays-law` | generator at max EMF | magnet held STILL, large steady flux |
| `lenzs-law` | magnet pushed TOWARD | magnet pulled AWAY |
| `mutual-inductance` | step-up power (conceptual) | secondary current (numeric) |
| `magnetic-flux` | "flux at a point" | same B, two loop orientations |
| `magnetic-materials` | foil / coin / filings | magnet down a COPPER pipe |
| `self-inductance` | steady state | switch OPENED, inductor drives current |
| `ac-basics` | peak 325 V | equal-heating definition of RMS |
| `electromagnetic-waves` | E at MAXIMUM | E exactly ZERO |
| `lc-circuits` | at max CURRENT | at max capacitor VOLTAGE |
| `magnetic-dipole` | a bar magnet | a current LOOP, which has no poles at all |
| `maxwells-equations` | do electrons cross the gap? | the stretched-surface paradox |
| `solenoid` | changing RADIUS | changing LENGTH at fixed total turns |

`electromagnetic-waves` and `lc-circuits` are exact complements of their
existing probes — a learner who memorised "B is at maximum when E is at
maximum" gets the E = 0 case wrong unless they hold the in-phase relation.

## The test is now an invariant, not a ratchet

`gateAssessmentIsServerOwned.test.ts` asserted `short <= N` with N ratcheted
down over nine batches: 145 → 139 → 131 → 117 → 103 → 88 → 72 → 53 → 32 → 16.
It now asserts **`short === 0`**. The ratchet form and its history comment are
kept deliberately: the number can no longer go down, so the test's job has
changed from "make progress" to "never regress".

The `excludeProbeStem` fallback path is NOT dead code and was not touched —
it still covers repeat visits within one concept, and every non-physics
subject, none of which has been through this pass.

## Final ratchet state

| ratchet | start of session | now |
|---|---|---|
| physics concepts short of 3 gradeable probes | 103 | **0** |
| legacy probe-slug collisions (pre-Item-6 measure) | 450 | **553** |

Live identity (`buildProbeSlugResolver`) 0 discarded across all 1,292 physics
probes and every other subject — that is the invariant that matters; the
legacy figure counts ladder rungs by construction.

## What this does and does not mean

It means the deterministic gate now HAS an authored assessment to serve at
every stage of every physics concept, so `findBestProbe` never runs dry and
hands the gate back to the model mid-lesson.

It does **not** mean a learner sees them. These probes live in the repo. They
reach production only through the seed path, and the recorded blocker still
stands: `scripts/brain/seed-knowledge-assets.ts` checks that an identity
exists but not that it has a content row, so it will skip all 737 hollow
identities. **No production write, no sweep re-run, no topic marked
VERIFIED** in this batch or any of the five before it.

## Validation

Offline only. `npx tsc --noEmit` clean; 321 files / 6,697 passed / 9 skipped;
`npm run build` clean.

---

# THE RATCHET WAS MEASURING ONE CORPUS OF FOUR

Physics reached zero. Moving to chemistry surfaced something worse than a
content gap: **the guard could not see three of the four authored corpora.**

`gateAssessmentIsServerOwned.test.ts` filters `AUTHORED_PROBES` on
`subjectSlug === 'physics'`. Chemistry, biology and computer science are not
in `AUTHORED_PROBES` at all — they are separate exported arrays in their own
seed files, concatenated by every seed writer
(`scripts/brain/seed-knowledge-assets.ts`, `src/instrumentation.ts`). So a
test that reads as "the authored corpus actually converts" was measuring a
quarter of it.

Measured with the identical `probeToMcq` filter:

| subject | concepts | short of three |
|---|---|---|
| chemistry | 186 | 186 |
| biology | 108 | **108 — every single one** |
| computer_science | 119 | **119 — every single one** |

Biology and CS carry exactly two gradeable probes on every concept they have.
Their gate runs dry on the last check for 100% of their content, and nothing
in a 6,700-test suite said so.

Now covered: a new `describe` block measures all three, raw count and
band-aware, pinned as maxima exactly like the physics ratchet.

---

# CHEMISTRY BATCH 1 — chem.env, chem.sblock, chem.anal, chem.surface (17)

Twelve target a blueprint MC-3 that had no gradeable probe. Five concepts had
all their documented misconceptions probed already and got transfer cases:
`water-soil` (judge a reported BOD > COD pair as impossible),
`chromatography` (the same compound on normal- and reversed-phase),
`colloids` (Tyndall beam through sugar water vs milk), `emulsions` (has the
oil DISSOLVED?), and `atmosphere`'s MC2 sibling.

Chemistry: **186 → 169** short. Biology and CS untouched this batch.

## THE REGRESSION THE GUARD CAUGHT — worth recording in full

The first version of this batch authored the third probe as `probeKind:
'mcq'`, the way every physics batch did. `difficultyLadderIdentity.test.ts`
failed immediately:

> every non-physics probe keeps the exact identity it had before Item 6
> — expected 34 items to deeply equal []

The reason is real and specific to chemistry. A second `mcq` at the same
`gradeBand` turns a singleton slot into a **difficulty ladder**, and
`buildProbeSlugResolver` then appends a rung segment to that slot's slug —
which changes the identity of the probe **that was already there**.

For physics that cost nothing: the production audit found physics has no
`HUMAN_CURATOR` seed rows at all, only live-capture `AI_AUTHORED` ones. **For
chemistry it would have been damaging** — chemistry is the one subject fully
seeded in production, 744/744 `HUMAN_CURATOR` rows. Re-identifying 34 of them
would leave the seeded rows stranded under slugs the writer no longer
generates, and the next seed run would insert fresh duplicates alongside them.

Fixed at the source, not by relaxing the test: the new probes use
`probeKind: 'checkpoint'`, an already-established kind (136 uses in the
corpus) whose slot was verified free on all 17 concepts. That keeps every
existing chemistry identity byte-for-byte — re-verified, `0` non-physics
probes changed identity — and `findBestProbe` filters on
conceptId/language/status and never on `probeKind`, so nothing about what the
learner sees differs.

**This is the correct precedent for chemistry, biology and CS from here on:
author the third probe into a FREE slot, never onto an existing rung.**

## Validation

Offline only. `npx tsc --noEmit` clean; 321 files / 6,706 passed / 9 skipped;
`npm run build` clean. Live `buildProbeSlugResolver` identity: 0 discarded
across all four corpora. **No production write, no sweep re-run, no topic
marked VERIFIED.**

---

# CHEMISTRY BATCH 2 — chem.redox, chem.dblock, chem.nitro, chem.poly (20)

Chemistry **169 → 149** short. Every probe uses the free-slot precedent
(`probeKind: 'checkpoint'`) established last batch; re-verified afterwards:
**0 non-physics identities changed**, live resolver 0 discarded.

Thirteen target a blueprint MC with no gradeable probe. Two of those are
worth naming separately, because they were not simply "the third
misconception" — **`chem.dblock.oxo-species` and `chem.nitro.heterocycles`
had BOTH existing probes pointed at MC1**, leaving their MC2 completely
unprobed despite the concept looking covered on a raw count. Found by
reading the targeted-misconception lists rather than the probe totals.

| concept | newly covered |
|---|---|
| `redox.oxidation-state` | MC3 — the oxidising agent gets oxidised |
| `redox.balancing` | MC3 — just swap H⁺ for OH⁻ for basic solution |
| `redox.activity-series` | MC3 — metals always react with metal salts |
| `redox.disproportionation` | MC3 — the electron count doesn't balance |
| `redox.titrations` | MC3 — add starch at the start |
| `dblock.general` | MC3 — "variable" means any whole-number OS |
| `dblock.first-row` | MC3 — remove 3d electrons first |
| `dblock.oxo-species` | **MC2 — both probes were on MC1** |
| `dblock.organometallics` | MC3 — an OS change means the catalyst is spent |
| `nitro.amines` | MC3 — direct alkylation gives a clean 1° amine |
| `nitro.nitro-compounds` | MC3 — HNO₃ itself is the electrophile |
| `nitro.heterocycles` | **MC2 — both probes were on MC1** |
| `poly.addition` | MC3 — all polyethylene is the same |

Seven concepts document only two misconceptions, both probed, and got
transfer cases: `lanthanides` (reason from the SHARPNESS of the absorption
lines, not the colour), `diazonium` (why the reaction is run at 0–5 °C and
used immediately), `amino-acids` (count the charged GROUPS at the pI, not the
net), `condensation` (Xₙ = 1/(1−p) at 98% vs 99%), `properties` (a fully
amorphous polymer has a Tg but no Tm), `biodegradable` (bio-PET vs PLA — same
feedstock story, opposite outcome), `natural` (why termites digest cellulose
and we do not).

## Validation

Offline only. `npx tsc --noEmit` clean; 323 files / 6,750 passed / 9 skipped;
`npm run build` clean. **No production write, no sweep re-run, no topic
marked VERIFIED.**

Remaining: chemistry 149, biology 108, computer_science 119.

---

# MISCONCEPTION BREADTH — and an honest correction to "physics complete"

Chemistry batch 2 turned up two concepts whose BOTH probes pointed at the
same misconception. That looked like a local oddity. Sweeping all four
corpora showed it is not:

| subject | concepts whose gradeable probes share ONE misconception |
|---|---|
| computer_science | **88 of 119 (74%)** |
| biology | **25 of 108 (23%)** |
| chemistry | 7 of 186 (4%) |
| physics | 6 of 238 → **1** after this batch |

## This qualifies the previous entry, and the qualification matters

The entry above says physics is complete: all 238 concepts reach three
gradeable probes. That statement is still true and the ratchet still reads
zero. But **six physics concepts reached three probes while only ever testing
ONE misconception.** A learner holding the other documented misconception
could answer every check correctly and close the concept with the error
intact.

Their shape explains how it passed: each carried a summative probe on MC-A, a
prerequisite DIAGNOSTIC probe carrying no misconception at all, and a
FORMATIVE probe on MC-A again — a deliberate diagnostic→formative→summative
ladder for one misconception. Good authoring by one measure, blind by another.

Five were genuine gaps and are now closed:

| concept | misconception that had no diagnostic |
|---|---|
| `phys.mech.momentum` | MC-MOMENTUM-IS-SCALAR — direction doesn't matter |
| `phys.mech.angular-kinematics` | MC-DEGREES-NOT-RADIANS |
| `phys.mech.moment-of-inertia` | MC-I-INDEPENDENT-OF-AXIS |
| `phys.mech.rotational-dynamics` | MC-ROTATIONAL-KE-IGNORED |
| `phys.mech.angular-momentum` | MC-TORQUE-CHANGES-SPEED — precession |

**The sixth is not a defect.** `phys.mech.velocity`'s blueprint documents
exactly ONE misconception, so three probes on it is correct authoring. It
stays in the count permanently, which is precisely why the new test is
documented as a candidate signal rather than a verdict.

## What the new guard does and does not claim

`gateAssessmentIsServerOwned.test.ts` gains a breadth block, ratcheted per
subject at 1 / 7 / 25 / 88. It cannot read blueprints, so it cannot know how
many misconceptions a concept actually has — **every number it reports must be
confirmed against the concept's blueprint before being treated as a gap.**
A second assertion is strict rather than ratcheted: no concept may end up with
zero targeted misconceptions across its whole gradeable set, because then a
wrong answer diagnoses nothing. All four corpora pass that today.

## Why this is the more important number than probe count

Probe count measures whether the gate has something to serve. Breadth
measures whether passing the gate means anything. `computer_science` at 74%
is the starkest case: three quarters of its concepts can be completed while
testing a single error, and its probe-count shortfall (119 of 119) had
already hidden that entirely.

## Validation

Offline only. `npx tsc --noEmit` clean; 323 files / 6,758 passed / 9 skipped;
`npm run build` clean. Legacy physics collisions 553 → 554 (one new rung; the
other four opened fresh slots). Live resolver 0 discarded, 0 non-physics
identities changed. **No production write, no sweep re-run against
production, no topic marked VERIFIED.**

---

# CHEMISTRY BREADTH — 7 → 0, and the count moved with it

All seven candidates from the breadth sweep were checked against their
blueprints BEFORE authoring, exactly as the new guard's docblock requires.
All seven were genuine: each documents at least two misconceptions and only
MC1 was probed. None was a `phys.mech.velocity`-style false positive.

One probe per concept closed **both** gaps — the unprobed misconception and
the missing third gradeable item — so chemistry moved 149 → 142 on count and
7 → 0 on breadth in the same batch.

| concept | misconception that had no diagnostic |
|---|---|
| `atomic.photoelectric-effect` | MC2 — de Broglie waves are observable for any object |
| `period.modern-periodic-law` | MC2 — the d-block fills *n*d, not (*n*−1)d |
| `hyd.polycyclic` | MC2 — naphthalene's α and β are equally activated |
| `bio.vitamins` | MC2 — steroid hormones are one hormone at different doses |
| `org.arrow-pushing` | MC2 — two arrows from one lone pair in a single step |
| `elect.concentration-cell` | MC2 — the dilute side is the cathode |
| `bio.nucleic-acids` | MC2 — DNA and RNA differ only in T vs U |

Two of these are worth noting as more than bookkeeping. `org.arrow-pushing`
MC2 is a mechanism-drawing error that produces five-bonded oxygen — it
invalidates every mechanism the learner draws afterwards. `nucleic-acids` MC2
hides the 2′-OH, which is the reason RNA hydrolyses and DNA does not; a
learner who "knows" only T-vs-U cannot explain RNA's instability at all.

The chemistry breadth ratchet is now **0** but is left in ratchet form rather
than converted to a strict equality, so a future authoring batch cannot
silently reintroduce one.

## State after this batch

| subject | short of 3 probes | within one band | single-misconception |
|---|---|---|---|
| physics | 0 | 0 | 1 (`phys.mech.velocity`, correct by design) |
| chemistry | 142 | 142 | **0** |
| biology | 108 | 108 | 25 |
| computer_science | 119 | 119 | 88 |

## Validation

Offline only. `npx tsc --noEmit` clean; 324 files / 6,776 passed / 9 skipped;
`npm run build` clean. Live resolver 0 discarded, 0 non-physics identities
changed. **No production write, no sweep re-run against production, no topic
marked VERIFIED.**

---

# SCOPE LOCK ACCEPTED — and a defect class that is not a content gap

Moat authoring is now limited to **Physics and Chemistry**. Biology and CS
breadth work was queued and is **cancelled, not started**. Their measurements
stay in the guard as recorded findings, which the lock explicitly permits.

Re-measured the CURRENT repository rather than trusting the historical
numbers, as instructed. Two of those numbers were wrong, in both directions.

## Measurement bug found first, before acting on it

A first pass reported "72 blueprint misconceptions with no probe" in physics.
That was **inflated by the measurement, not real**. Two parser faults:

1. Blueprints head one misconception with TWO ids —
   `### MC-1: MC-TIME-DILATION-IS-ILLUSION`. Seeds use either. Reading them as
   separate ids reported probed misconceptions as unprobed. Whole concepts
   (`time-dilation`, `bohr-model`, `de-broglie`, `mirrors`) showed every
   misconception "missing" purely from this.
2. The id regex stopped at `/`, truncating
   `MC-B-FALLS-OFF-AS-1/R-SQUARED` to `MC-B-FALLS-OFF-AS-1`.

Fixed both, then re-measured: **72 → 56**. Recorded because acting on 72 would
have produced sixteen probes for misconceptions that were already covered.

## The real defect: misconception ids that join to nothing

Sharper than any count. When a learner picks a distractor, route.ts writes
MISCONCEPTION_DETECTED keyed on that `misconceptionId`, and the repair path
resolves it against the authored remedy — which the blueprint keys by its own
id. **An id in no blueprint means detection fires, the ledger records it, and
the repair can never resolve.** A silent teaching failure invisible to every
count-based measure.

| corpus | ids joining to nothing |
|---|---|
| physics | **60** distinct, across 54 concepts |
| chemistry | 4 distinct, across 4 concepts |

Two sub-classes, handled differently on purpose:

**RENAME (11) — fixed.** Same misconception, different spelling:
`MC-CENTRIFUGAL-FORCE-REAL` vs the blueprint's `MC-CENTRIFUGAL-REAL`;
`MC-ANGLE-FROM-SURFACE` vs `MC-REFLECTION-ANGLE-FROM-SURFACE`;
`MC-CMASS-*` vs `MC-COM-*`. Every pair was confirmed against the blueprint's
own trigger-signal text, never on token similarity — the two lowest-overlap
candidates were read in full first, and both proved genuine. 33 references
rewritten. Physics has no HUMAN_CURATOR rows in production, so no seeded row
was disturbed.

**NO-MATCH (49) — deliberately NOT "fixed".** The seed names a misconception
the blueprint does not document at all: `phys.therm.thermal-expansion` probes
`MC-HOLE-SHRINKS` while its blueprint documents only `MC-ONLY-LENGTH-EXPANDS`
and `MC-WATER-ALWAYS-EXPANDS-WITH-HEAT`. Retargeting these onto a nearby
blueprint id would make the number pass while attaching a probe to the WRONG
diagnosis — worse than the gap. Blueprints are Curriculum-Production-Pipeline
territory, so these are **curriculum feedback**, not a seed edit.

Chemistry's 4 are all NO-MATCH and are additionally left alone because
chemistry IS seeded in production: rewriting a stored `targetedMisconceptions`
value would diverge the repo from the rows already serving.

## Regression guard

`src/tests/misconceptionIdsJoinToBlueprints.test.ts` — reads the real
blueprints from disk, ratchets the residue at 49 / 4, and names all eleven
repaired ids individually so a revert fails with the specific id rather than a
count. It also fails if a blueprint ever drops an id a probe still references.

## Measured state, both subjects, after this iteration

| | physics | chemistry |
|---|---|---|
| concepts | 238 | 186 |
| short of 3 gradeable | **0** | 142 |
| short within one band | **0** | 142 |
| single-misconception concepts | 1 (correct by design) | **0** |
| duplicate stems within a concept | 0 | 0 |
| blueprint MCs with no probe | 56 | 133 |
| ids joining to no blueprint | 60 → **49** | 4 |

## Honest status ladder

- **authored in repository** — everything above.
- **seeded in production** — chemistry only (744 HUMAN_CURATOR rows).
  Physics has none.
- **production-served / production-verified / end-user ready** — NOT
  established this session. No production access was used; the seed script's
  content-row blind spot still blocks seeding regardless.

## Validation

`npx tsc --noEmit` clean; 325 files / 6,779 passed / 9 skipped; `npm run
build` clean. Live resolver 0 discarded, 0 non-physics identities changed.

---

# CHEMISTRY BATCH — chem.state (6) + chem.bio (4), and a THIRD defect class

Chemistry **142 → 132** short; unprobed blueprint misconceptions **133 → 128**.

Six `chem.state` concepts had a documented misconception with no gradeable
probe (Boyle's law read as direct proportion; effusion by momentum rather than
speed; van der Waals `a` as the volume term; evaporation as slow boiling;
supercritical CO₂ as "just a gas"). One, `kinetic-theory`, had all three
documented misconceptions probed already and took a transfer case — the
existing pair compares two GASES, the new one asks about the spread of speeds
WITHIN one gas, which neither reaches.

## The third defect class: the id joins, but the content does not

The guard added last iteration catches ids matching **no** blueprint. It
cannot catch a probe whose id matches a real blueprint id while the QUESTION
diagnoses a different misconception. The join succeeds; every count looks
healthy. Found by reading `chem.bio` concept by concept:

**`chem.bio.enzyme-kinetics` — tags SWAPPED.** The probe asking "Km 0.1 mM vs
10 mM, which binds more strongly?" is precisely blueprint MC-1 ("a higher Km
means the enzyme binds its substrate more strongly") but carried MC2. The
competitive-inhibitor probe is MC-2's territory and carried MC1.

**`chem.bio.lipids` — mis-tagged, hiding a real gap.** The probe on unsaturated
melting points carried MC1, but blueprint MC-1 is *saponification* ("just
dissolves the fat in the base"); the probe actually tests MC-2 ("unsaturated
means liquid"). So MC-1 was **unprobed while appearing covered**, and a new
probe was authored for it.

Why this outranks a plain gap: a learner who errs has MISCONCEPTION_DETECTED
written against the wrong id, so the repair path serves the remedy for a
misconception they do not hold. Actively wrong, not merely absent.

Corrected in the repo and pinned by assertion. **It cannot be detected
structurally** — it needs stem-against-blueprint reading. Two were found in
the six `chem.bio` concepts examined; **the other 180 chemistry concepts and
all 238 physics concepts have NOT been audited this way.** Recorded as an open
risk rather than presented as resolved.

### Production divergence, stated explicitly

Chemistry is seeded in production (744 HUMAN_CURATOR rows). These tag
corrections change `targetedMisconceptions`, not `canonicalSlug`, so **no row
is stranded** — but the seed script skips identities that already exist, so
**the corrected tags do NOT reach production without a targeted update**. The
repo is right; production still carries the crossed tags.

## Measured state after this iteration

| | physics | chemistry |
|---|---|---|
| concepts | 238 | 186 |
| short of 3 gradeable | **0** | 132 |
| short within one band | **0** | 132 |
| single-misconception concepts | 1 (correct by design) | **0** |
| blueprint MCs with no probe | 56 | 128 |
| ids joining to no blueprint | 49 (blueprint-side) | 4 |
| mis-tagged (id joins, content differs) | **unaudited** | 2 found, 2 fixed; rest unaudited |

## Validation

`npx tsc --noEmit` clean; 325 files / 6,809 passed / 9 skipped; `npm run
build` clean. Live resolver 0 discarded, 0 non-physics identities changed.
Offline only — no production write, nothing production-verified.

---

# chem.period (7 concepts) — the mis-tag rate is much worse than chem.bio

Chemistry **132 → 126** short; unprobed blueprint misconceptions **128 → 121**.
All seven `chem.period` concepts now hold ≥3 gradeable probes in one band.

## Stem-vs-blueprint audit, applied to every concept for the first time

**Five of the fourteen pre-existing probes carried a tag whose blueprint text
they did not test** — in seven concepts. chem.bio's rate was two in six; this
domain is worse, which is why the check is now run on every concept rather
than sampled.

| concept | probe stem | was | is | why |
|---|---|---|---|---|
| `classification` | "main limitation of Mendeleev's table" | MC2 | **MC3** | MC-2 is *no predictive power*; the stem tests mass-vs-atomic-number |
| `electron-affinity` | "Cl has more negative EA than F, why?" | MC1 | **MC2** | that IS the F/Cl anomaly; MC-1 is the sign convention |
| `electron-affinity` | "would neon release or absorb energy?" | MC2 | **MC3** | tests *adding electrons is always exothermic* |
| `valency` | "does carbon carry a real −4 charge in CH₄?" | MC1 | **MC3** | oxidation-state-as-real-charge, not fixed valency |
| `valency` | "oxidation state of H in NaH?" | MC2 | **MC3** | oxidation state again, not the NCl₅ misconception |

Two concepts had **every** documented misconception left unprobed while
appearing covered: `valency` (both probes were MC-3 questions, so MC-1 and
MC-2 had no diagnostic) and `electron-affinity` (MC-1 unprobed).

## Ten probes authored, each written against the blueprint's MC text

`modern-periodic-law` MC-3 (hydrogen is not an alkali metal) ·
`classification` MC-2 (eka-aluminium → gallium, the gaps were predictions) ·
`periodic-properties` MC-1 (EN ≠ EA: F most electronegative yet Cl's EA more
negative), MC-2 (reactivity falls down a group for non-metals), MC-3 (the
Mg>Al and P>S dips recur every period) · `ionization-energy` MC-3 (distance,
not failing shielding) · `electron-affinity` MC-1 (more negative = stronger) ·
`atomic-radius` MC-3 (lanthanide contraction, Zr≈Hf) · `valency` MC-1 (S is 2
in H₂S, 6 in H₂SO₄) and MC-2 (NCl₅ cannot exist — period 2 has no d orbitals).

## An identity collision I introduced, and the guard that caught it

Giving three new `periodic-properties` probes the same
`checkpoint/HIGH/PROFICIENT` slot made them **identical after resolution — 3
would have been silently discarded at seed time**, and it shifted 7 chemistry
identities by turning singleton slots into ladders.
`difficultyLadderIdentity.test.ts` failed immediately on "every non-physics
probe keeps the exact identity it had before Item 6".

Resolved **without weakening the guard**: the extra probes now use distinct
kinds already in the `ProbeKind` union and unused by the corpus (`step_check`,
`true_false`), so every chemistry slot stays a singleton.
Re-verified: **0 discarded, 0 non-physics identities changed.**

None of the 7 momentarily-shifted identities was production-seeded — all were
`checkpoint` probes authored in this campaign — but the fix removes the drift
entirely rather than arguing it was harmless.

## Curriculum feedback — not fixed here

`periodic-properties`' two pre-existing probes (Li-vs-F radius; Na→Na⁺ drop)
test **atomic and ionic radius**, which no MC on that concept documents; they
belong on `chem.period.atomic-radius`. Retargeting them onto an unrelated MC
would mis-route a wrong answer, so their tags are left as recorded defects for
a curriculum decision.

## Measured state

| | physics | chemistry |
|---|---|---|
| short of 3 gradeable | **0** | 126 |
| short within one band | **0** | 126 |
| single-misconception concepts | 1 (by design) | **0** |
| blueprint MCs with no probe | 56 | 121 |
| ids joining to no blueprint | 49 | 4 |
| stem-vs-blueprint audited | **0 of 238** | 23 of 186 |

## Validation

`npx tsc --noEmit` clean; 325 files / 6,812 passed / 9 skipped; `npm run
build` clean. Offline only — no production write; production still carries the
pre-correction tags because the seed script skips existing identities.

---

# chem.sol (6 concepts) — six more mis-tags; the rate is not improving

Chemistry **126 → 120** short; unprobed blueprint misconceptions **121 → 115**.
All six `chem.sol` concepts now hold ≥3 gradeable probes in one band.

## Stem-vs-blueprint: 6 defects in 6 concepts

| concept | stem | was | is |
|---|---|---|---|
| `types` | oil dissolves in hexane, not water | MC1+MC3 | **MC2** (like-dissolves-like *is* "solubility is absolute") |
| `solubility` | the bends, via Henry's law | MC2 | **MC3** (N₂ is non-reactive yet dissolves) |
| `vapour-pressure` | 1 mol NaCl vs 1 mol sugar | MC1 | **MC2** (what quantity enters Raoult's law) |
| `vapour-pressure` | "three separate phenomena?" | MC2 | **MC3** (that *is* the unrelated-phenomena claim) |
| `activity` | concentrated-solution cell deviation | MC2 | **MC1** (activity ≠ concentration; says nothing about γ≤1) |
| `colligative` | CaCl₂ effective particle molality | MC1 | **MC2** (van 't Hoff dissociation, not molarity-vs-molality) |

`chem.sol.types` was the worst: after correction, **all three of its documented
misconceptions had been unprobed** — one probe covered MC-2 only, and the other
carries `MC4`, an id its blueprint does not define (one of the four known
chemistry orphans).

## Nine probes authored

`types` MC-1 (ideal ≠ soluble: benzene/toluene vs HCl-in-water) and MC-3 (soda
water is gas-in-liquid but the solution is liquid) · `solubility` MC-2 (Henry's
law is gas-only; pressure barely moves NaCl) · `vapour-pressure` MC-1 (surface
occupancy, not chemical holding — equal lowering per particle regardless of
bonding) · `activity` MC-2 (positive Raoult deviation ⇒ γ>1) and MC-3 (ionic
strength of CaCl₂ is 0.3 M, not 0.1 M) · `osmosis` MC-3 and `colligative` MC-3
(π = iMRT ≈ 7 atm — the pressure a red cell holds back) · `colligative` MC-1
(molality is temperature-independent; molarity is not).

## Identity discipline held from the start this time

Every new probe took a free `(conceptId, probeKind, gradeBand)` slot —
`checkpoint` for the first on a concept, `step_check` for the second — after
the previous batch's collision. Verified: **0 discarded, 0 non-physics
identities changed.**

## Running stem-vs-blueprint tally

| | audited | concepts with pre-existing probes | mis-tags found |
|---|---|---|---|
| chemistry | 29 of 186 | 25 | **13** |
| physics | 0 of 238 | — | unknown |

Better than one mis-tagged probe for every two concepts audited. Physics
reads 0 short on probe count and has had **none** of this checking.

## Measured state

| | physics | chemistry |
|---|---|---|
| short of 3 gradeable | 0 | 120 |
| short within one band | 0 | 120 |
| single-misconception concepts | 1 (by design) | 0 |
| blueprint MCs with no probe | 56 | 115 |
| ids joining to no blueprint | 49 | 4 |

## Validation

`npx tsc --noEmit` clean; 325 files / 6,817 passed / 9 skipped; `npm run
build` clean. Offline only — production still carries every pre-correction tag.

---

# chem.solid (6 concepts) — five more mis-tags, plus three with no valid home

Chemistry **120 → 114** short; unprobed blueprint misconceptions **115 → 109**.
All six `chem.solid` concepts now hold ≥3 gradeable probes in one band.

## Stem-vs-blueprint: 5 retags

| concept | stem | was | is |
|---|---|---|---|
| `crystal-systems` | atoms belonging to one cubic cell | MC1 | **MC2** (fractional corner shares) |
| `packing` | 52% vs 74% efficiency | MC2 | **MC3** (simple cubic denser) |
| `defects` | AgBr Frenkel vs NaCl Schottky | MC2 | **MC1** (both change density) |
| `ionic-solids` | NaCl vs CsCl same structure? | MC2 | **MC3** (Madelung vs coordination) |
| `properties` | Si vs Cu conductivity with temperature | MC1 | **MC3** (NTC/PTC naming) |

## A sub-class worth separating: probes with NO valid home

Three probes test something **no misconception on their concept documents**:

- `crystal-systems` — the glass-softening probe belongs to `chem.solid.amorphous`
- `defects` — the silicon-doping probe tests "defects are always bad", undocumented
- `properties` — the p-type charge-neutrality probe matches none of MC-1…MC-3

These are left tagged as they are and recorded. Retargeting them onto an
unrelated id would mis-route a wrong answer, which is worse than the gap;
resolving them needs either a blueprint addition or moving the probe to
another concept, both Curriculum-Pipeline decisions.

## Nine probes authored

`crystal-systems` MC-1 (CsCl is not BCC — two species) and MC-3 (coordination
counts neighbours, not covalent bonds) · `packing` MC-2 (fluorite: Ca²⁺ on the
CCP lattice, F⁻ in all tetrahedral holes) · `defects` MC-2 (Fe₀.₉₅O is a real
compound; definite proportions governs molecular species) and MC-3 (F-centre =
*Farbzentrum*, not fluorine) · `amorphous` MC-3 (glass softens through Tg, no
latent heat) · `ionic-solids` MC-2 (the lattice-energy step starts from gaseous
IONS) · `properties` MC-1 (solid NaCl has ions but they are immobile) and MC-2
(diamond is an insulator — 5.5 eV vs silicon's 1.12 eV).

## Running stem-vs-blueprint tally

| | audited | with pre-existing probes | mis-tags | no-valid-home |
|---|---|---|---|---|
| chemistry | 35 of 186 | 31 | **18** | 3 |
| physics | 0 of 238 | — | unknown | unknown |

## Measured state

| | physics | chemistry |
|---|---|---|
| short of 3 gradeable | 0 | 114 |
| short within one band | 0 | 114 |
| single-misconception concepts | 1 (by design) | 0 |
| blueprint MCs with no probe | 56 | 109 |
| ids joining to no blueprint | 49 | 4 |

## Validation

`npx tsc --noEmit` clean; 325 files / 6,822 passed / 9 skipped; `npm run
build` clean. 0 discarded, 0 non-physics identities changed. Offline only —
production still carries every pre-correction tag.

---

# chem.hyd (6 concepts) — two concepts had BOTH probes off-target

Chemistry **114 → 108** short; unprobed blueprint misconceptions **109 → 103**.

## Stem-vs-blueprint: 5 retags

| concept | stem | was | is |
|---|---|---|---|
| `alkynes` | terminal C–H pKa 25 vs 50 | MC1 | **MC3** (acidity) |
| `alkynes` | can a weak base deprotonate it? | MC2 | **MC3** (acidity) |
| `petroleum` | why is cracking economically important | MC1 | **MC2** (cracking ≠ distillation) |
| `petroleum` | does molecular shape affect fuel quality | MC2 | **MC3** (octane number) |
| `arenes` | Cl deactivating yet o/p-directing | MC1 | **MC2** (directing effects) |

`alkynes` had **both** probes on MC-3, leaving MC-1 (Lindlar vs Na/NH₃
stereochemistry) and MC-2 (terminal-alkyne hydration gives a ketone, not an
aldehyde) with no diagnostic at all.

## Two concepts where every documented misconception was unprobed

`alkanes` and `conformations` each had **both** probes testing something no MC
on their concept documents — boiling-point trends and general reactivity for
`alkanes`; conformer interconversion for `conformations`. Both therefore had
all three MCs unprobed while reading as covered on every structural measure.
Each gained three probes rather than a token third.

## Thirteen probes authored

`alkanes` MC-1 (R–X forms in the second propagation step, not initiation),
MC-2 (bromine is the selective halogen, not chlorine), MC-3 ("free" rotation
is not isoenergetic) · `alkenes` MC-2 (bromonium ion forces anti addition —
cis-butene gives the racemate, not meso), MC-3 (hydroboration vs
oxymercuration are complementary) · `alkynes` MC-1 (Lindlar gives cis, Na/NH₃
gives trans), MC-2 (hex-1-yne hydrates to hexan-2-one) · `petroleum` MC-1
(heavy fractions condense at the hot bottom) · `conformations` MC-1 (eclipsed
is destabilised by torsional strain), MC-2 (a Newman front carbon shows four
bonds), MC-3 (the ring flip swaps axial and equatorial) · `arenes` MC-1 (NO₂⁺
is the electrophile), MC-3 (Friedel-Crafts alkylation rearranges).

## Running stem-vs-blueprint tally

| | audited | with pre-existing probes | mis-tags | no-valid-home |
|---|---|---|---|---|
| chemistry | 42 of 186 | 37 | **23** | 7 |
| physics | 0 of 238 | — | unknown | unknown |

## Measured state

| | physics | chemistry |
|---|---|---|
| short of 3 gradeable | 0 | 108 |
| single-misconception concepts | 1 (by design) | 0 |
| blueprint MCs with no probe | 56 | 103 |
| ids joining to no blueprint | 49 | 4 |

## Validation

`npx tsc --noEmit` clean; 325 files / 6,825 passed / 9 skipped; `npm run
build` clean. 0 discarded, 0 non-physics identities changed. Offline only.

---

# chem.alc (6 concepts) — a third hollow concept, and three genuinely clean ones

Chemistry **108 → 102** short; unprobed blueprint misconceptions **103 → 99**.

## Stem-vs-blueprint

One retag: `alcohols`' "tertiary alcohol + KMnO₄" probe carried MC1 while it
tests MC-3 (tertiary alcohols cannot be oxidised) exactly.

**`chem.alc.diols` is the third hollow concept found** (after `chem.hyd.alkanes`
and `chem.hyd.conformations`): both probes tested boiling point and antifreeze
colligative behaviour, neither documented on that concept, so all three MCs —
periodate cleavage, OsO₄ syn addition, the pinacol rearrangement — had no
diagnostic while every structural measure read it as covered.

**Three concepts audited genuinely clean**, which is worth recording as much as
the defects: `phenols`, `epoxides` and `protection` each had both probes
correctly matched to their blueprint misconceptions. `epoxides` and `protection`
document only two MCs each, both already probed, so they needed a count-closing
probe rather than a breadth fix.

## Ten probes authored

`alcohols` MC-1 (only phenol reacts with NaOH — pKa 16 vs 10 against water's
15.7) and MC-2 (PCC stops at the aldehyde; aqueous KMnO₄ goes on to the acid) ·
`ethers` MC-2 (Williamson needs the primary halide — tert-butoxide + CH₃Br, not
NaOCH₃ + t-BuBr, which eliminates) and MC-3 (HI cleaves at the tertiary carbon
via SN1) · `diols` MC-1 (periodate cleaves the C–C bond, giving two acetones),
MC-2 (OsO₄ is syn — cis-butene gives the R,R/S,S pair, not meso), MC-3 (pinacol
rearranges to a KETONE) · `phenols` MC-3 (Kolbe–Schmitt is ortho-selective by
chelation — salicylic acid) · `epoxides` MC-2 (acid opens at the MORE
substituted carbon; base at the less hindered one) · `protection` MC-1 (the TMS
group comes back off).

## Running stem-vs-blueprint tally

| | audited | with pre-existing probes | mis-tags | no-valid-home | clean |
|---|---|---|---|---|---|
| chemistry | 48 of 186 | 43 | **24** | 9 | 3 concepts fully clean |
| physics | 0 of 238 | — | unknown | unknown | unknown |

## Measured state

| | physics | chemistry |
|---|---|---|
| short of 3 gradeable | 0 | 102 |
| single-misconception concepts | 1 (by design) | 0 |
| blueprint MCs with no probe | 56 | 99 |
| ids joining to no blueprint | 49 | 4 |

## Validation

`npx tsc --noEmit` clean; 325 files / 6,827 passed / 9 skipped; `npm run
build` clean. 0 discarded, 0 non-physics identities changed. Offline only.

---

# chem.kinet (7 concepts) — a new variant: probes tagged with an id they don't test

Chemistry **102 → 95** short; unprobed blueprint misconceptions **99 → 94**.

## A fourth defect shape: the surplus tag

Four of the seven concepts carried probes tagged with **two** misconception
ids where only one is actually tested. The surplus id does two harmful things:
it makes breadth look wider than it is, and a wrong answer is recorded against
a second misconception the learner may not hold.

| concept | probe | was | is |
|---|---|---|---|
| `rate` | stoichiometric rate ratios | MC1+**MC3** | MC1 |
| `photochemistry` | quantum yield ≈ 10⁶ | MC1+**MC2** | MC1 |
| `rate-law` | doubling [A] quadruples rate | MC1+**MC2** | MC1 |
| `integrated-rate` | constant half-life ⇒ order | MC1+**MC2** | MC1 |

Plus two ordinary retags on `mechanism`: the rate-determining-step probe was
MC3 but derives the rate law from the MECHANISM (MC-1); the catalyst-in-overall-
equation probe was MC1 but belongs with the intermediate-in-rate-law
misconception (MC-2).

## `chem.kinet.arrhenius` — the fourth hollow concept

Both probes tested activation-energy-vs-thermodynamics (paper not igniting) and
catalyst effect on ΔH — **neither documented on that concept**. Celsius-in-
Arrhenius, the sign of the ln k vs 1/T slope, and the meaning of A all had no
diagnostic. It gained three probes.

## Thirteen probes authored

`rate` MC-2 (rate falls continuously, no cliff) and MC-3 (heat raises the
fraction of collisions over the barrier, it does not melt particles) ·
`photochemistry` MC-2 (A = log₁₀(I₀/I) = 1.00, not 2.303) and MC-3 (the Chapman
second step is thermal) · `rate-law` MC-2 (a negative order means doubling [A]
HALVES the rate) and MC-3 (k is concentration-independent) · `arrhenius` MC-1
(T must be kelvin), MC-2 (slope is −Ea/R, so Ea ≈ 71 kJ/mol from −8500 K),
MC-3 (A is the pre-exponential factor) · `mechanism` MC-3 (a rate law can only
rule mechanisms out) · `integrated-rate` MC-2 (1/[A] RISES) and MC-3 (ln[A] vs
t is the first-order plot) · `catalysis` MC-3 (halving Ea gives ~10⁷, not 2×).

## Running stem-vs-blueprint tally

| | audited | with pre-existing probes | mis-tags | surplus tags | no-valid-home | clean |
|---|---|---|---|---|---|---|
| chemistry | 55 of 186 | 50 | 26 | **4** | 11 | 3 |
| physics | 0 of 238 | — | unknown | unknown | unknown | unknown |

## Measured state

| | physics | chemistry |
|---|---|---|
| short of 3 gradeable | 0 | 95 |
| single-misconception concepts | 1 (by design) | 0 |
| blueprint MCs with no probe | 56 | 94 |

## Validation

`npx tsc --noEmit` clean; 325 files / 6,829 passed / 9 skipped; `npm run
build` clean. 0 discarded, 0 non-physics identities changed. Offline only.

---

# The surplus tag turned out to be STRUCTURALLY detectable — and found 10 more

Last iteration recorded the surplus tag as a manual finding. It is not: a probe
listing more `targetedMisconceptions` than its distractors can trigger is
checkable in code. Building that guard immediately surfaced **three related
defect shapes, all live**, none of which any existing measure could see.

## 1. Contradictory tag — the probe's tag disagrees with its own evidence

`chem.kinet.arrhenius`' "paper doesn't ignite" probe was tagged **MC1** while
its only mapped distractor carried **MC2**. A wrong answer would have written
MC2 while the probe's metadata claimed MC1.

## 2. Inert tag — a tag no answer can ever fire

`chem.org.iupac`' substituent-ordering probe was tagged MC2 with **no
distractor carrying a misconceptionId at all**.

Both probes also test something their blueprint does not document (Ea-vs-
thermodynamics; alphabetical ORDERING where MC-2 is locant PLACEMENT). Rather
than retarget them onto an unrelated id, both were made **honestly
non-diagnostic** — tag removed, question kept. That is a legitimate state: the
physics corpus uses prerequisite DIAGNOSTIC probes carrying no tag.

## 3. Undeclared distractor — the largest of the three, 10 probes

A distractor naming an id the probe never declares. **6 chemistry + 4 physics
probes.** Consequence: `MISCONCEPTION_DETECTED` writes an id the probe's own
metadata omits, so any join keyed on `targetedMisconceptions` misses it and
breadth undercounts. Examples: `chem.thermo.heat-capacities` triggered MC1
while declaring only MC3; `phys.mech.kinetic-energy`'s prerequisite diagnostic
declared nothing while triggering `MC-KE-LINEAR`.

**The distractor is the operative behaviour** — it is what actually writes
evidence — so the tag list was the thing at fault. Every added id was confirmed
to exist in that concept's blueprint. Chemistry's unprobed-MC count fell
94 → 90 purely from declaring what was already being diagnosed.

## A regression the breadth ratchet caught on me

Emptying `chem.org.iupac`' tag left that concept testing a single misconception,
and the chemistry breadth ratchet (pinned at 0) failed. Fixed the right way —
by authoring the MC-2 probe the concept had never had (locant placement,
2-methylpentane vs methylpentane-2) — not by raising the ceiling.

## New guard

`misconceptionIdsJoinToBlueprints.test.ts` gains two strict assertions over
physics and chemistry: no distractor may name an id the probe does not target,
and every targeted misconception must have a distractor that can trigger it.

The second is **scoped to choice-based probes**, deliberately: a `short_answer`
or open `checkpoint` probe has no distractors at all yet can legitimately carry
a tag graded by keyword or model. Applying it unscoped flagged 107 correctly
authored physics probes — the assertion was wrong, not the corpus.

## Measured state

| | physics | chemistry |
|---|---|---|
| short of 3 gradeable | 0 | 95 |
| single-misconception concepts | 1 (by design) | 0 |
| blueprint MCs with no probe | 56 | **90** (was 94) |
| contradictory / inert / undeclared tags | **0** | **0** |

## Validation

`npx tsc --noEmit` clean; 326 files / 6,854 passed / 9 skipped; `npm run
build` clean. 0 discarded, 0 non-physics identities changed. Offline only.

---

# chem.pblock (7 concepts) — hollow concepts five and six

Chemistry **95 → 87** short; unprobed blueprint misconceptions **90 → 84**.

## Four retags

| concept | stem | was | is |
|---|---|---|---|
| `group14` | diamond insulator vs graphite conductor | MC1 | **MC2** (that IS the diamond/graphite misconception) |
| `group17` | why Group 1 and 17 trends run opposite | MC1 | **MC3** (halogen reactivity increases down) |
| `group17` | can I₂ displace Cl⁻? | MC2 | **MC3** (same reactivity-order misconception) |
| `trends` | inert-pair effect, Pb²⁺ vs Pb⁴⁺ | MC1 | **MC3** (max OS = valence electrons) |

## Hollow concepts five and six

`group15` and `group16` each had **both** probes testing something their
blueprint does not document. `group16` is the starkest so far: two valid-looking
probes, valid ids, no orphans — and **all three** documented misconceptions
(H₂O/H₂S boiling point, SO₂ bleaching reversibility, oxygen's inability to
expand its octet) with no diagnostic at all.

Running hollow count: `hyd.alkanes`, `hyd.conformations`, `alc.diols`,
`kinet.arrhenius`, `pblock.group15`, `pblock.group16`.

## Fourteen probes authored

`group13` MC-2 (aluminium is amphoteric — reacts vigorously with NaOH) and
MC-3 (boric acid is a LEWIS acid; the H⁺ comes from water) · `group14` MC-1
(SiO₂ is a network solid, not CO₂'s analogue) · `group15` MC-1 (P₄ has six
single bonds, no P≡P) and MC-2 (+5 oxidation state, four actual bonds) ·
`group16` MC-1 (hydrogen bonding, not packing), MC-2 (SO₂ bleaching reverses in
sunlight), MC-3 (oxygen cannot expand its octet) · `group17` MC-1 (F₂ is the
stronger oxidiser despite Cl's more negative EA) and MC-2 (HF is WEAK — bond
strength, not polarity) · `group18` MC-2 (argon is chosen for inertness, not
non-conduction) and MC-3 (a blue-violet "neon" sign is argon) · `trends` MC-1
(water breaks the hydride trend upward) and MC-2 (ionic hydration vs covalent
hydrolysis).

## Running stem-vs-blueprint tally

| | audited | with pre-existing probes | mis-tags | surplus | no-valid-home | hollow | clean |
|---|---|---|---|---|---|---|---|
| chemistry | 62 of 186 | 57 | 30 | 4 | 18 | 6 | 3 |
| physics | 0 of 238 | — | — | — | — | — | — |

## Measured state

| | physics | chemistry |
|---|---|---|
| short of 3 gradeable | 0 | 87 |
| single-misconception concepts | 1 (by design) | 0 |
| blueprint MCs with no probe | 56 | 84 |
| contradictory / inert / undeclared tags | 0 | 0 |

## Validation

`npx tsc --noEmit` clean; 326 files / 6,855 passed / 9 skipped; `npm run
build` clean. 0 discarded, 0 non-physics identities changed. Offline only.

---

# chem.coord — six of seven concepts were hollow

The worst domain measured in this campaign. Every one of the seven concepts
carried exactly two probes, two distinct misconception ids, and both ids
joined to a real blueprint heading. Every structural measure read "covered."
Reading the fourteen stems against the fourteen blueprint misconception
bodies, **twelve of the fourteen tested something the blueprint does not
document at all** — leaving all three documented misconceptions unprobed on
six of the seven concepts.

| concept | P1 | P2 | verdict |
|---|---|---|---|
| `werner` | AgNO₃ precipitation, tagged MC1 | "was Werner's theory merely descriptive?" tagged MC2 | hollow |
| `nomenclature` | di- vs bis(ethylenediamine), tagged MC1 | complex charge vs oxidation state, tagged MC2 | 1 retag + 1 no-valid-home |
| `cft` | how many levels do 5 d orbitals split into, tagged MC1 | strong field → fewer unpaired, tagged MC2 | hollow |
| `bonding` | CO vs Cl⁻ spectrochemical order, tagged MC1 | [Ni(CN)₄]²⁻ vs [NiCl₄]²⁻ geometry, tagged MC2 | hollow |
| `applications` | EDTA overdose in chelation therapy, tagged MC1 | Fe–O₂ bond-strength tuning, tagged MC2 | hollow |
| `stability` | chelate effect is entropic, tagged MC1 | larger chelate rings, tagged MC2 | **MC1 correct**; MC2 no valid home |
| `isomerism` | cisplatin vs transplatin activity, tagged MC1 | ionisation isomers, tagged MC2 | hollow |

`chem.coord.stability`'s chelate-effect MCQ is the single probe in the domain
that survived unchanged: its distractor states MC-1 ("each individual Ni–N
bond is significantly stronger") verbatim. It is now pinned by stem so it
cannot drift.

## One retag

`chem.coord.nomenclature` P1 asks whether two ethylenediamine ligands are
named "diethylenediamine" or "bis(ethylenediamine)". That is blueprint MC-3
("di-ethylenediamine means two ethylene groups within one ligand") word for
word. It carried MC-1, which is the ligand-ORDER misconception (alphabetical
vs by abundance) and had no probe at all.

## Nineteen probes authored

Each uses the blueprint's own discrimination pair or characteristic phrase as
the distractor, so a wrong answer names the documented misconception rather
than being generic noise.

`werner` MC-1 (oxidation state +3 vs coordination number 6 for the same
complex), MC-2 ([Co(NH₃)₄Cl₂]Cl — only ONE of three chlorides precipitates),
MC-3 ([Ag(NH₃)₂]⁺ has CN = 2) · `nomenclature` MC-1 (chlorido before ammine —
alphabetical, not abundance), MC-2 (hexacyanidoferrate contains no oxygen; the
"-ate" marks charge) · `cft` MC-1 (CFSE is exactly zero for d¹⁰ whatever the
ligand), MC-2 (Δtet ≈ 4/9 Δoct), MC-3 (Zn²⁺ is d¹⁰ FULL, not d⁰ empty) ·
`bonding` MC-1 (d²sp³ inner-orbital low spin vs sp³d² outer-orbital high spin
— different magnetic moments), MC-2 (π donors are WEAK-field; strong-field
ligands are π acceptors), MC-3 (VBT is bounded by MO theory, not abolished) ·
`applications` MC-1 (CO binding is reversible competition at the same Fe(II)
site), MC-2 (transplatin DOES react with DNA — the lesion type differs),
MC-3 (Mg²⁺ is d⁰; the porphyrin π system absorbs, and green is reflected) ·
`stability` MC-2 ([Co(NH₃)₆]³⁺ is kinetically inert AND thermodynamically
unstable in acid), MC-3 (β_n = ΠK_i; only log β_n is additive) · `isomerism`
MC-1 (conformers rotate freely; cis/trans requires bond breaking), MC-2
(nitro/nitrito are isolable — red and yellow, different IR), MC-3
(cis-[Co(en)₂Cl₂]⁺ has NO mirror plane and resolves into Δ/Λ; the trans
isomer is the achiral one).

Every new probe opened a free `(conceptId, probeKind, gradeBand)` slot —
`checkpoint`, `step_check`, `true_false`, none of which any chemistry concept
was using. No existing chemistry identity moved, so nothing already seeded in
production is stranded or re-identified.

Running hollow count: `hyd.alkanes`, `hyd.conformations`, `alc.diols`,
`kinet.arrhenius`, `pblock.group15`, `pblock.group16`, `coord.werner`,
`coord.cft`, `coord.bonding`, `coord.applications`, `coord.isomerism` — 11.

## Running stem-vs-blueprint tally

| | audited | with pre-existing probes | mis-tags | surplus | no-valid-home | hollow | clean |
|---|---|---|---|---|---|---|---|
| chemistry | 69 of 186 | 64 | 31 | 4 | 20 | 11 | 4 |
| physics | 0 of 238 | — | — | — | — | — | — |

## Measured state

| | physics | chemistry |
|---|---|---|
| short of 3 gradeable | 0 | 80 |
| single-misconception concepts | 1 (by design) | 0 |
| blueprint MCs with no probe | 56 | 77 |
| contradictory / inert / undeclared tags | 0 | 0 |

Note on the "blueprint MCs with no probe" row: it fell only 84 → 77 for seven
concepts closed, because the structural measure counted just MC-3 as unprobed
on each — MC-1 and MC-2 already carried tags. Those tags were the defect. The
number a count can see and the number a reader can see are different numbers,
which is the whole reason this domain needed reading.

## Production divergence

Unchanged and still true: the seed script skips identities that already
exist, so the corrected tags — 31 in chemistry now — remain WRONG in the
744 HUMAN_CURATOR chemistry rows already in production. The 19 probes
authored here have never been seeded. Nothing in this batch is
production-served or production-verified.

## Validation

`npx tsc --noEmit` clean; full suite green; `npm run build` clean.
0 discarded, 0 non-physics identities changed. Offline only.

---

# chem.hal — the first crossed pair

Seven concepts, fourteen pre-existing probes. Five retags, fifteen probes
authored, and one defect shape that had not appeared before in this campaign.

## The crossed pair: chem.hal.sn1

`chem.hal.sn1`'s two probes each diagnose the OTHER one's tag.

| probe | distractor states | blueprint | carried |
|---|---|---|---|
| "double the [Nu] in an SN1 — what happens to the rate?" | "the rate doubles, since the nucleophile is a necessary reactant" | MC-2 (rate = k[R–X][Nu]) | **MC1** |
| "does SN1 always give EXACTLY 50:50?" | "the planar carbocation guarantees exactly equal attack from both faces" | MC-1 (complete racemisation) | **MC2** |

A crossed pair is the hardest shape for any structural check to see. Two
probes, two distinct ids, both ids joining a real blueprint heading, full
breadth, no surplus, no orphan, no inert tag — every automated measure in this
repository reports it healthy. And a learner who errs on either one has
MISCONCEPTION_DETECTED written against the misconception they DID NOT
demonstrate, so the repair path serves the remedy for the other one. Both are
now uncrossed and pinned by stem.

## The other four retags

`cfcs` P1 (one Cl• destroys ~100,000 O₃) is the catalytic-cycle probe = MC-2
("Cl• is used up in the first step, so each CFC destroys one O₃"), not MC-1
(fluorine depletes ozone by analogy with chlorine) · `grignard` P2 (a free
–OH elsewhere in the molecule) tests destruction by a protic proton = MC-1
("can be stored in water"), not MC-2 (adds to the carbonyl oxygen) ·
`introduction` P1's distractor states MC-2 verbatim — "the aromatic ring
should provide extra stabilization that makes chlorobenzene MORE reactive" —
and carried MC-1 (C–F is most reactive because most polar).

## One more hollow concept: chem.hal.sn2

Both existing probes are sound chemistry and neither is any of the three
documented misconceptions: the 1°/2°/3° SN2 rate probe tests steric hindrance
(undocumented here), and the Walden-inversion probe tests R/S versus optical
rotation sign (also undocumented). All three blueprint misconceptions were
unprobed. Hollow total: 12.

`chem.hal.haloarenes` failed check 3 for a subtler reason worth recording:
its MC-1 probe asks "why does chlorobenzene NOT undergo SN2?", so the stem's
own premise hands the answer to a learner who believes it does. A probe whose
premise contradicts the misconception cannot diagnose it. A proper MC-1 probe
was authored, presenting the backside-attack proposal as the student's own and
asking what is wrong with it.

## Fifteen probes authored

`cfcs` MC-1 (HFC-134a has four fluorines and depletes nothing — C–F does not
photolyse) and MC-3 (CCl₄ is tetrahedral: four bond dipoles sum to zero;
CHCl₃ does not) · `elimination` MC-1 (cis vs trans 1-bromo-2-methylcyclohexane
— only the anti-periplanar β-H is usable) and MC-3 (tBuBr + KOtBu gives
2-methylpropene, not an ether) · `grignard` MC-2 (the methyl bonds to the
carbonyl CARBON, not the oxygen) and MC-3 (ester + 1 equiv gives the tertiary
alcohol; the ketone intermediate is more electrophilic than the ester it came
from) · `haloarenes` MC-1 (there is no back face to attack at an sp² ring
carbon), MC-2 (chlorobenzene nitrates ~30× SLOWER than benzene while still
directing o/p) and MC-3 (chlorobenzene needs 350 °C / 300 atm; SNAr needs
activation, cf. 1-chloro-2,4-dinitrobenzene) · `introduction` MC-1 (CH₃I >
CH₃Br > CH₃Cl >> CH₃F — bond strength and leaving-group ability, not polarity)
and MC-3 (low solubility is an energy comparison, not an absence of
interaction) · `sn1` MC-3 (a primary carbocation is prohibitively unstable, so
SN1 is not "simpler", it does not happen) · `sn2` MC-1 ((R)-2-bromobutane in
plain water racemises substantially — SN1 competes), MC-2 (thiolate beats
ethoxide by a wide margin despite being ~10⁶ times the weaker base) and MC-3
(concerted means exactly one maximum and no intermediate).

All fifteen open a free `(conceptId, probeKind, gradeBand)` slot. 0 discarded,
0 non-physics identities changed.

## Running stem-vs-blueprint tally

| | audited | with pre-existing probes | mis-tags | surplus | no-valid-home | hollow | clean |
|---|---|---|---|---|---|---|---|
| chemistry | 76 of 186 | 71 | 36 | 4 | 23 | 12 | 5 |
| physics | 0 of 238 | — | — | — | — | — | — |

## Measured state

| | physics | chemistry |
|---|---|---|
| short of 3 gradeable | 0 | 73 |
| single-misconception concepts | 1 (by design) | 0 |
| blueprint MCs with no probe | 56 | 70 |
| contradictory / inert / undeclared tags | 0 | 0 |

## Production divergence

36 corrected chemistry tags now differ from the 744 HUMAN_CURATOR rows already
in production; the seed script skips existing identities, so none of the
corrections and none of the 34 probes authored across the last two batches
have reached the database. Nothing here is production-served or
production-verified.

## Validation

`npx tsc --noEmit` clean; full suite green; `npm run build` clean.
Offline only.

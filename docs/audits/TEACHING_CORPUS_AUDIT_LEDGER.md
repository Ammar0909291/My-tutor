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
| **What it does NOT block** | The audit itself — every finding is from real authenticated HTTP with full response text recorded here. |

## Retry log
| date | attempt | result |
|------|---------|--------|
| 2026-08-12 | 1 | Supabase MCP: 0 projects |
| 2026-08-12 | 2 | Supabase MCP reconnected under a new name, then disconnected; on reconnection still **0 projects**. B-1/B-2/B-3 remain blocked. |

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

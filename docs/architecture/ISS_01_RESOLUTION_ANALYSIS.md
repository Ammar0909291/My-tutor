# ISS-01 — Ladder Reconciliation: Resolution Analysis

**Document class:** Phase 4 decision analysis. Companion to
`ISS_01_LADDER_RECONCILIATION.md`, which raised the issue and is not
superseded — its three defects are re-verified here and its recommendation is
strengthened, not replaced.
**Status:** ANALYSIS COMPLETE · DECISION OPEN (owner). No production code was
changed. `kernel/tsm/machine.ts` remains unwired.
**Executable evidence:** `src/tests/ladderReconciliation.test.ts` (23
assertions), `src/tests/conversationStateMigration.test.ts` (9),
`src/tests/ladderConformance.test.ts` (19, pre-existing, unchanged).
**Production evidence:** direct read-only queries against the live database,
2026-08-24. Quoted inline; no production data was modified.

---

## 0. What changed as a result of this analysis

ISS-01 named three defects (D1 order inversion, D2 mastery unreachable, D3
seven diverging transitions) and recommended Option C (retire the unwired
machine). This analysis re-verified all three and found **four more**, one of
which is decisive:

> **D4 — the absorbing barrier.** Under canonical authority, bridged to the
> move layer by the repository's own `canonicalToLegacy`, a learner who
> answers **every** question correctly **never leaves DEMONSTRATE**. Not
> "reaches TRANSFER with the wrong counters" — never gets there at all.
> `ASSESS` and `TRANSFER` are not visited in sixty turns.

D2 measured the canonical ladder by feeding it a correct signal on every turn,
including turns on which the runtime asks nothing. That is the optimistic
reading. The honest one is worse, and it means **fixing D1, D2 and D3 would
not make the canonical machine promotable.** The reconciliation is therefore
not "align the thresholds and the order"; it is "the canonical machine is a
specification of a ladder, not an implementation of one."

---

## 1. Method

Both machines are pure, total functions over small finite state spaces, so
they were **enumerated, not sampled**:

| | shipping ladder | canonical machine |
|---|---|---|
| states | 6 (`PHASE_ORDER`) | 10 (`PHASE_ORDER_10`) |
| evidence kinds | 6 | 4 |
| `demonstrated` | both values | both values |
| cells enumerated | 72 | 80 |

ISS-01's table covers 12 cells — (6 phases × correct/incorrect). The four
evidence kinds it omits (`recovery`, `acknowledgement`, `explain_differently`,
no-signal) are exactly the ones carrying the reachability law, the
anti-hollow-advancement boundary and the remediation path. Enumerating only
the two kinds both machines happen to share makes the canonical machine look
far closer to shippable than it is.

The move layer was included in the simulation. A ladder cannot be judged in
isolation from the thing that decides whether a question gets asked, because
its upward edges are gated on answers to questions.

---

## 2. Per-state semantics — the comparison the decision actually needs

### 2.1 The shipping ladder (`src/lib/teaching/conversationState.ts`)

| state | pedagogical purpose | evidence IN | evidence OUT | correct | incorrect | confusion (recovery / "explain differently") |
|---|---|---|---|---|---|---|
| **OBSERVE** | diagnostic: what does the learner already have? | session start, or a concept change | a recognition answer, a receipt, or a concluded diagnostic | → DEMONSTRATE | → DEMONSTRATE (a concluded diagnostic MOVES the machine) | → DEMONSTRATE |
| **DEMONSTRATE** | the teacher shows | a diagnostic that concluded | `demonstrated` — i.e. **the teacher acted**, not the learner | → GUIDE | → DEMONSTRATE (floor) | → DEMONSTRATE |
| **GUIDE** | supported practice, teacher alternates teach/ask | a demonstration happened | a supported step succeeded, or a receipt | → CHECK | → DEMONSTRATE (re-show, don't re-ask) | → DEMONSTRATE |
| **CHECK** | **formative** check — "did that land?" | guided success | `correctAtCheck ≥ 1` | → PRACTICE, `correctAtCheck++` | → GUIDE | → GUIDE |
| **PRACTICE** | independent application | one correct check | `correctAtPractice ≥ 2` | hold, `correctAtPractice++`; at 2 → TRANSFER | → CHECK | → CHECK |
| **TRANSFER** | novel-context application; certification eligible | two correct applications | the Mastery module owns the exit | hold | → PRACTICE | → PRACTICE |

- **Formative checking:** CHECK. Low stakes; one correct answer suffices.
- **Independent practice:** PRACTICE. Two correct answers required.
- **Summative assessment:** *there is no separate summative state.* PRACTICE's
  second success is the gate, and TRANSFER is the reward, not the exam.
- **Mastery becomes reachable at:** the second correct PRACTICE answer —
  `correctAtCheck ≥ 1 && correctAtPractice ≥ 2`, six turns from OBSERVE.

### 2.2 The canonical machine (`src/lib/kernel/tsm/machine.ts`)

| state | pedagogical purpose | evidence IN | evidence OUT | correct | incorrect | confusion |
|---|---|---|---|---|---|---|
| **DIAGNOSE** | placement | session start | placement resolved | → ANCHOR | → drop one | → drop one |
| **ANCHOR** | attach to prior knowledge | placement resolved | substantive engagement | → DEMONSTRATE | → drop one | → drop one |
| **DEMONSTRATE** | instances shown | anchoring | a correct **prediction** | → NAME | → DEMONSTRATE (floor) | → floor |
| **NAME** | the learner names the thing | instances shown | `learnerRestated` — an own-words restatement | → FORMALIZE | → DEMONSTRATE | → DEMONSTRATE |
| **FORMALIZE** | the formal statement / formula | own-words gate passed | `formulaAnchored` | → GUIDED | → NAME | → NAME |
| **GUIDED** | supported practice | formula anchored | a **fluent** success (confidence ≠ low) | → INDEPENDENT | → FORMALIZE | → FORMALIZE |
| **INDEPENDENT** | unaided practice | fluent guided success | **`correctAtCheck ≥ 2`** | hold until 2, then → REFLECT | → GUIDED | → GUIDED |
| **REFLECT** | consolidation / self-explanation | two unaided successes | one turn | → ASSESS | → INDEPENDENT | → INDEPENDENT |
| **ASSESS** | **summative** gate — "can you prove it?" | reflection done | **`correctAtPractice ≥ 1`** | → TRANSFER | → REFLECT | → REFLECT |
| **TRANSFER** | novel-context application | gate item passed | Mastery module owns the exit | hold | → ASSESS | → ASSESS |

- **Formative checking:** **nowhere.** There is no low-stakes check between
  GUIDED and INDEPENDENT.
- **Independent practice:** INDEPENDENT.
- **Summative assessment:** ASSESS.
- **Mastery becomes reachable at:** never, under the shipping gate — see §3.

### 2.3 Why this is a decision and not a rename

The mapping `CHECK → ASSESS` equates a **formative check** with a **summative
gate**. They sit on opposite sides of independent practice and answer
different questions. Neither ladder is a subset of the other:

- canonical has **no formative-check position**;
- shipping has **no reflection/consolidation position** and no separate
  summative gate;
- canonical splits DEMONSTRATE into DEMONSTRATE + NAME + FORMALIZE, and the
  own-words gate (`learnerRestated`) is a real pedagogical commitment the
  shipping ladder does not make;
- shipping's OBSERVE fuses DIAGNOSE + ANCHOR.

The canonical ladder is the more expressive teaching model. It is also,
today, an unimplementable one — because expressiveness in the state set was
never matched by expressiveness in the **evidence** set (§4, D5).

---

## 3. The defects, re-verified and extended

### D1 — the mapping inverts the order relation · CONFIRMED

`legacyToCanonical` is a bijection on names and round-trips to identity, which
is what hides it. Legacy orders CHECK(3) before PRACTICE(4); canonical orders
INDEPENDENT(6) before ASSESS(8). Every `phaseIndex ± 1` transition is computed
from that order.

### D2 — mastery unreachable · CONFIRMED (and it is the optimistic reading)

Walking each ladder on all-correct answers:

| | turns to TRANSFER | `correctAtCheck` | `correctAtPractice` | `masteryVerified()` |
|---|---|---|---|---|
| shipping | 6 | 1 | 2 | **true** |
| canonical (optimistic) | 9 | 2 | 1 | **false** |

Same two field names; inverted thresholds. `masteryGate` requires `check ≥ 1`
and `practice ≥ 2`.

**Production cross-check (2026-08-24):** of 474 live sessions carrying a
ladder, **61 have `correctAtCheck ≥ 1 && correctAtPractice ≥ 2`** — the
shipping ladder's reachability is a measured fact about real learners, not a
test fixture. A cutover that makes it unreachable is a regression from a
working state.

### D3 — transition divergence · CONFIRMED and widened

ISS-01 counts 7 of 12 diverging over two evidence kinds. Over the full
six-kind vocabulary the count is **21 of 36 unexplained**, 3 accepted, 12
preserved (`ladderReconciliation.test.ts`, §C).

### D4 — the absorbing barrier · NEW · DECISIVE

Simulated with the real move layer, the real bridge and a perfect learner:

```
t 1 DIAGNOSE   (OBSERVE)     move=ask   -> ANCHOR
t 2 ANCHOR     (OBSERVE)     move=ask   -> DEMONSTRATE
t 3 DEMONSTRATE(DEMONSTRATE) move=teach -> DEMONSTRATE
t 4 DEMONSTRATE(DEMONSTRATE) move=show  -> DEMONSTRATE
…
t60 DEMONSTRATE(DEMONSTRATE) move=show  -> DEMONSTRATE      check=0 practice=0
```

The chain, each link independently verified:

1. Canonical `DEMONSTRATE` and `NAME` both map to legacy `DEMONSTRATE`
   (`canonicalToLegacy`).
2. `decideNextMoveHeuristic`'s phase table returns `'show'` for
   `DEMONSTRATE`, unconditionally.
3. A `show` turn asks nothing, so the model emits no `<!--SIGNAL-->`.
4. `signalCorrect` is therefore `null`.
5. `step()` on a null signal returns `{ to: from, gate: 'no signal — machine held' }`.

The shipping ladder escapes this exact fixed point by two mechanisms the
canonical machine does not have: the **reachability law** (`DEMONSTRATE →
GUIDE` is gated on `demonstrated`, i.e. on what the *teacher* did, not on a
learner signal) and the **acknowledgement branch**. `conversationState.ts`
documents both at length, because both were added after the absorbing state
was observed in production.

Consequence: **D4 is not fixed by fixing D1/D2/D3.** Any Option A must also
redesign the move layer and the evidence vocabulary.

### D5 — the evidence-vocabulary gap · NEW

Canonical `TurnEvidence` has four fields. The shipping `TurnEvidence` has
twenty-plus. Four absences are load-bearing:

| field | what it protects | canonical equivalent |
|---|---|---|
| `acknowledgement` | the only input possible after a delivery turn | none |
| `learnerRequest: 'explain_differently'` | the remediation path | none |
| `degradedTurn` | **P4/F7** — a provider outage must not bank mastery evidence | none |
| `signalVerificationStatus` | `masteryVerifiedStrict`'s verified counters | none |

`degradedTurn` is a production safety invariant with a recorded incident
behind it. `MachineState` also carries no `verifiedCorrectAtCheck` /
`verifiedCorrectAtPractice`, so strict mastery is blocked for a second reason
independent of D2.

### D6 — two stage-ceiling authorities · NEW

`PHASE_MAX_QUESTION_STAGE` (read by route.ts and by simulation invariant I-1)
and `getStageCeiling` (read by BASE_PACK) **agree on all six legacy names**
and disagree at three canonical ones:

| canonical | canonical ceiling | via `canonicalToLegacy` | delta |
|---|---|---|---|
| NAME | 3 | 2 | +1 |
| INDEPENDENT | 5 | 6 | −1 |
| **ASSESS** | **6** | **4** | **+2** |

ASSESS is the one `policyGate.ts` already warns about. Today nothing is broken
because the phase is passed verbatim in the legacy vocabulary — the agreement
is a property of the *vocabulary in use*, not of the tables.

**Downstream consequence, measured:** `checkEpisode`'s I-1 invariant reads
`PHASE_MAX_QUESTION_STAGE[phase]`, which is `undefined` for a canonical name,
and `7 > undefined` is `false`. A Stage-7 question at `ANCHOR` or `ASSESS` is
**not flagged**. The 10⁴-episode merge gate would silently stop checking its
first invariant.

### D7 — a failure edge labelled `down` that moves up · NEW · minor

`step()` hardcodes `direction: 'down'` on every failure edge without
consulting the index it computed. At `DIAGNOSE`/`ANCHOR` with `demonstrated:
true` the floor is `DEMONSTRATE` (index 2), so a failure moves the learner
**forward two states** while the provenance record says it dropped them. The
shipping ladder has no equivalent state, because its floor is consistent with
its order.

---

## 4. Mastery reachability — the hard invariant, proven

**Statement.** An all-correct learner walking a legitimate progression must
arrive somewhere `masteryVerified()` is true, with **no threshold relaxed**.

**Thresholds are unchanged and asserted as unchanged** in three separate test
files: `MASTERY_CHECK_REQUIRED === 1`, `MASTERY_PRACTICE_REQUIRED === 2`.
Nothing in Phase 4 touched `masteryGate.ts`, `masteryVerifiedStrict`, or any
evidence requirement.

| ladder | satisfies the invariant | evidence |
|---|---|---|
| shipping | **YES** — 6 turns, `check=1 practice=2`, strict mastery also true | `ladderReconciliation.test.ts` §B; 61 live production sessions |
| canonical, optimistic reading | NO — arrives at TRANSFER with `check=2 practice=1` | §B, D2 |
| canonical, runtime reading | NO — never reaches ASSESS or TRANSFER in 60 turns | §B, D4 |

**Therefore:** the canonical ladder cannot satisfy the existing mastery spine,
and per the standing rule the ladder semantics must be redesigned rather than
the mastery gate weakened. This analysis does not attempt that redesign,
because it is a curriculum/pedagogy design task and because Option C makes it
unnecessary for the cutover.

---

## 5. Transition reconciliation — every difference classified

Full table: `src/tests/ladderReconciliation.test.ts` §C, 36 rows, one per
(phase × evidence kind), each asserted against both machines and each carrying
a written reason.

| disposition | count | meaning |
|---|---|---|
| preserved | 12 | canonical reproduces the shipping edge exactly |
| intentionally-removed | 3 | the three mastery-gate receipts — canonical's lack of an acknowledgement channel is *accidentally correct* here, and only here |
| **UNEXPLAINED** | **21** | artefacts of the CHECK↔ASSESS conflation or of the missing evidence vocabulary — no one decided them |

"Zero divergence" is not "canonical must equal legacy". It is "every
difference has an authoritative, explicitly accepted meaning." Today 21 of 36
have none. The two most serious remain the ones ISS-01 named:

- `CHECK + one correct answer → TRANSFER` — skips independent practice
  entirely; the assessment-skip the redesign exists to prevent, *introduced by
  the migration*;
- `TRANSFER + failure → CHECK` — two rungs, violating the
  one-dimension-per-rung law the canonical machine's own header cites.

---

## 6. Persisted-state migration

### 6.1 The census — measured, not assumed

Read-only query against production, 2026-08-24:

| | sessions |
|---|---|
| `contextSnapshot` present | 716 |
| …carrying `conversationState` | 488 |
| …carrying a `phase` string | 474 |
| **canonical phase values present** | **0** |
| unrecognised phase values | 0 |

Distribution: OBSERVE 222 · DEMONSTRATE 67 · GUIDE 58 · TRANSFER 57 ·
CHECK 49 · PRACTICE 21. Every stored value is one of the six legacy names.

**So no migration of existing rows is required, and none should be written.**
The question is not "how do we migrate what is there" but "what must never be
written."

### 6.2 What a canonical write would cost

`readConversationState` admits a stored state only when
`PHASE_ORDER.includes(raw.phase)`.

- **8 of the 10 canonical names are discarded** (`DIAGNOSE`, `ANCHOR`, `NAME`,
  `FORMALIZE`, `GUIDED`, `INDEPENDENT`, `REFLECT`, `ASSESS`), reason
  `unreadable-phase`. The ladder is rebuilt from zero: phase OBSERVE,
  `demonstrated` false, **`correctAtCheck` and `correctAtPractice` back to 0**
  — which silently revokes `masteryVerified()` for a learner who had earned
  it. The module's own A2b note already calls this behaviour "catastrophic,
  silently."
- **2 collide by name** (`DEMONSTRATE`, `TRANSFER`) and are **kept** —
  reinterpreted under different gate semantics with no diagnostic at all.
  That is worse than a reset, not better.

### 6.3 Rollback is not symmetric with a flag flip

Forward compatibility holds (`legacyToCanonical` is total over the legacy
names). Backward compatibility does **not**. Flags roll back instantly;
persisted data does not. **Any rollback taken after canonical values have been
written wipes every in-flight ladder that had passed a mastery gate.**

### 6.4 The deterministic strategy

| | rule |
|---|---|
| **M1** | Never widen the persisted vocabulary. `contextSnapshot.conversationState.phase` holds only the six legacy names, whatever the in-memory authority becomes. |
| **M2** | If a canonical machine is ever introduced, project on WRITE (`canonicalToLegacy`) and lift on READ (`legacyToCanonical`), so no persisted byte changes meaning. |
| **M3** | That projection is lossy (10 → 6: OBSERVE←{DIAGNOSE,ANCHOR}, DEMONSTRATE←{DEMONSTRATE,NAME}, GUIDE←{FORMALIZE,GUIDED}, CHECK←{REFLECT,ASSESS}). Any canonical-only distinction rides a **separate, additive, optional** field a legacy reader ignores — never the `phase` field. |
| **M4** | No migration of existing rows; under M1–M3 every stored row is already valid. Verified exhaustively over phases × counters. |

**Episode boundary.** Under M1–M4 a cutover changes no persisted value, so the
episode boundary is not needed for data safety — only for *behavioural*
continuity (not switching a learner's ladder semantics mid-lesson). That is a
weaker requirement and is satisfiable by reading the flag once per episode
rather than per turn; see the cutover-readiness document, §H.

**Watch signal during any rollout:** `inspectConversationStateRead`'s
`unreadable-phase` reason is the *only* one a cutover can introduce
(`concept-changed` and `no-stored-state` have other causes). Its rate is the
single number that says whether a ladder rollout is wiping learners.

---

## 7. The decision

### QUESTION
Which ladder semantics are authoritative for My Tutor, and what happens to
`kernel/tsm/machine.ts` and the `phases.ts` mapping?

### OPTIONS

**Option A — canonical ladder wins.** Promote the 10-state machine; re-home
CHECK's formative function; re-derive `masteryGate`'s thresholds against the
canonical gates; migrate persisted state.

**Option B — legacy ladder wins, canonical machine rewritten to match.**
Reorder `PHASE_ORDER_10` so ASSESS precedes INDEPENDENT (or split ASSESS into
formative/summative); rewrite `machine.ts`'s gates to match
`advanceConversationState`.

**Option C — do not unify.** Keep the shipping ladder as sole authority.
Retire `machine.ts` and the `legacyToCanonical`/`canonicalToLegacy`/
`PHASE_ORDER_10` mapping. Keep `getStageCeiling` + `LEGACY_STAGE_CEILING`,
which are live (imported by `BASE_PACK`).

**Option D — defer.** Change nothing; leave the machine unwired with its
warning header.

### TECHNICAL CONSEQUENCE

| | A | B | C | D |
|---|---|---|---|---|
| defects to fix first | D1–D7 **plus** a move-layer and evidence-vocabulary redesign | D1, D2, D3, D6, D7 | none | none |
| `masteryGate` thresholds | must be re-derived (the standing rule forbids weakening them, so the ladder must change instead) | untouched | untouched | untouched |
| persisted state | new vocabulary; §6.2 applies; rollback becomes destructive | unchanged | unchanged | unchanged |
| blast radius | `questionLegality`, `gateAssessment`, `conceptBudget`, `narrativeTracker`, `PHASE_FRAME`, `PHASE_MAX_QUESTION_STAGE`, `checkEpisode` I-1, route.ts | `machine.ts`, `phases.ts`, their tests | delete `machine.ts`; trim `phases.ts`; update 2 test files | none |
| the S5 trap | resolved by execution | resolved by execution | **removed** | **remains** |

Surgery scope for C is precisely known: `machine.ts` has **zero production
callers** (the only non-test reference is `kernel/index.ts`'s
`export * as tsm` barrel re-export); `legacyToCanonical` /
`canonicalToLegacy` / `PHASE_ORDER_10` / `STAGE_CEILING` are referenced in
code only by `machine.ts` and tests; `getStageCeiling` and
`LEGACY_STAGE_CEILING` are live and stay. Asserted in
`src/tests/decisionAuthorityInventory.test.ts`.

### PEDAGOGICAL CONSEQUENCE

- **A** buys the genuinely better teaching model: an own-words NAME gate, an
  explicit FORMALIZE step, a REFLECT consolidation position, and a real
  summative ASSESS separate from formative checking. Everything the
  Educational Brain's authored material assumes. It costs the loss of the
  formative check unless one is re-added, and — critically — the canonical
  ladder as written **cannot teach anyone**, so "adopting it" means designing
  a new ladder that happens to share its state names.
- **B** keeps today's teaching behaviour exactly and produces a 10-state
  machine that is a relabelling of a 6-state one. It buys almost nothing
  pedagogically while carrying the full cost of a second machine.
- **C** keeps today's teaching behaviour, which is the behaviour every gate
  and every learner-protection rule is calibrated against and which 61 live
  sessions have successfully completed. It forfeits NAME / FORMALIZE / REFLECT
  as *runtime states* — but they are not lost as *pedagogy*: they remain in
  the Educational Brain material, and they can be expressed as teaching
  actions within GUIDE/CHECK without a second state machine.
- **D** leaves a machine in the tree whose header says "landing pad for the
  K3 item" next to a doc saying "do not wire this". That combination is what
  produced this investigation; leaving it invites the same mistake again.

### RECOMMENDED OPTION

**Option C, then re-derive if and when the 10-state ladder is genuinely
wanted.** This is the same recommendation ISS-01 made; D4 makes it much
stronger.

### WHY

1. **The canonical machine has never taught anyone, and cannot.** D4 shows a
   perfect learner trapped at DEMONSTRATE for sixty turns. Nothing in
   production depends on its semantics, so retiring it costs nothing and
   removes a trap that is actively signposted as a next step.
2. **The shipping ladder's gates are the calibrated ones.** `masteryGate`,
   `questionLegality`, `firstLessonGuard`, `gateAssessment`, `conceptBudget`,
   the verifier context and the simulation invariant battery all read the
   6-phase vocabulary. Option A moves all of them at once.
3. **Its reachability is measured, not assumed** — 61 of 474 live ladders have
   reached verified mastery. A migration that makes that unreachable is a
   regression from a working state, and the rule for this phase is explicit:
   redesign the ladder, never weaken mastery.
4. **The persisted-state asymmetry makes A one-way.** With 0 canonical values
   in production today, the cheap moment to decide "never write them" is now.
5. **Retiring is not abandoning the 10-state model.** Option C's own wording:
   re-derive it *from* the shipping semantics with the Educational Brain
   material in hand, as a curriculum design task, rather than reconciling it
   *against* them as a runtime migration. The evidence vocabulary (D5) is the
   part that has to be designed first — states are cheap, evidence is not.

**This recommendation is not self-executing.** Retiring `machine.ts` touches
`kernel/stages/tsmStep.ts`'s declared landing pad and the masterplan's stated
K3 item ("`conversationState.ts` → kernel TSM (state-mapped)"), so it needs
owner sign-off. Nothing was retired in this change.

---

## 8. Exit criteria for S5 — restated against the new evidence

ISS-01 §5 listed four. They stand, with two additions and one correction.

1. An option is chosen and recorded by the owner. *(unchanged)*
2. `ladderConformance.test.ts`'s D2 expectation is inverted — the
   authoritative ladder must arrive at TRANSFER with `masteryVerified()` true.
   *(unchanged)*
3. `ladderConformance.test.ts`'s D3 divergence reaches 0 **and**
   `ladderReconciliation.test.ts`'s UNEXPLAINED count reaches 0 over the full
   six-kind evidence vocabulary. *(widened: 12 cells → 36)*
4. A migration path exists for persisted `ConversationState`. **Corrected:**
   the census shows nothing to migrate; what is required instead is a written
   commitment to M1–M4, and a rollback plan that accounts for §6.3.
5. **NEW — D4 is closed.** The authoritative ladder must have no state that is
   absorbing under the move layer that drives it. A ladder whose upward edge
   requires an answer to a question the runtime will never ask is not a
   ladder. Proven by simulation against the real move decision, not by
   inspection.
6. **NEW — D6 is closed.** One stage-ceiling authority, or two proven to agree
   over the vocabulary actually in use, and `checkEpisode`'s I-1 must be shown
   to still fire under the new vocabulary.

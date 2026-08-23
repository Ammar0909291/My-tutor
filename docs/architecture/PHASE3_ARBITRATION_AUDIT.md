# PHASE 3 — STEP 0 AUDIT: PRECEDENCE / ARBITRATION
**Series B Phase 3** (architecture hardening). Not to be confused with Series A's Phase 3
(Decision Ownership, blueprint §28) — see §29's banner for the two series and their commit ranges.

Traced at `feabc4c` (the pre-Phase-3 tip). No code had been written when this was produced; it is
the Step 0 artifact the implementation was derived FROM, preserved unedited except for the
corrections marked in place and this header. Every claim cites a file:line.

**WHY THIS IS COMMITTED.** The architecture audit that Series B Phase 1 and Phase 2 both cite by
name — the source of the "S3/C-a" finding — was never committed. When the session that held it hit
its usage limit, Phase 3's scope and closure criteria were unrecoverable from the repository, and
the next session had to re-derive them from commit messages and source. That cost a full handoff.
This file exists so that cannot happen again to Phase 4.

**STATUS: CLOSED.** The defects enumerated below (D1-D6, plus a seventh found in Step 5) were
closed in `5ae4295`. The contradiction matrix is preserved as the evidence that justified the
design, not as a live defect list.

## A. THE CURRENT ARBITRATION MECHANISM (traced, not assumed)

route.ts assembles the system prompt by string concatenation across **73 `systemPrompt +=` sites**
(extracted mechanically). There is no registry, no ordering policy, and no suppression mechanism.
Precedence is expressed by exactly two devices:

**Device 1 — SOURCE POSITION.** Later append = later in the prompt = recency advantage.
The route's own comments state this as the design:
  - route.ts:3022 "RECOVERY preemption ... injected LAST of all blocks"
  - route.ts:3065 "THE EXCURSION DIRECTIVE — injected LAST, after RECOVERY. Ordering is the fix"
  - outputLanguage.ts:39 "The smallest correct fix is to restate the contract ... last."

**Device 2 — PROSE AUTHORITY CLAIMS.** Blocks assert supremacy in English, to the model:
  | block | file:line | claim |
  |---|---|---|
  | TURN DIRECTIVE | conversationState.ts:1375 | "overrides any earlier advisory pacing" |
  | FIRST LESSON PROTOCOL | firstLessonGuard.ts:146 | "MANDATORY, OVERRIDES ANY CONFLICTING GUIDANCE ABOVE" |
  | RECOVERY | recoveryGuard.ts:710 | "PREEMPTS EVERYTHING ABOVE" |
  | RESPONSE LANGUAGE | outputLanguage.ts:77 | "FINAL RULE, OUTRANKS EVERY INSTRUCTION ABOVE" |
  | TEACHING ACTION: DIAGRAM | masteryGate.ts:676 | "overrides the turn move" |
  | TEACHING ACTION: REAL_LIFE_EXAMPLE | masteryGate.ts:590 | "overrides the turn move" |
  | NEW REQUEST AFTER COMPLETION | lessonCompletion.ts:261 | "overrides the 'do NOT teach/ask' line" |
  | OBSERVATION REPAIR | progressionIntegrity.ts:402 | "overrides pacing guidance" |

**ROOT CAUSE.** Seven blocks each claim authority over "everything above". The claims are
positional, not typed; they are not transitive; nothing checks them for consistency; and the
component that resolves them is the LLM. That is the arbiter today.

## B. THE ROOT CAUSE OF C1/C2, STATED EXACTLY

Phase 2 classified `CLOSING -> teaching` REACHABLE. The mechanism is not a model failure.

  - The close block is appended at **route.ts:2314**.
  - The TURN DIRECTIVE is appended at **route.ts:2894**, ~580 lines later, and its first line
    tells the model it "overrides any earlier advisory pacing".
  - `grep -c "CLOSING\|episode" src/lib/teaching/conversationState.ts` => **0**.
    The block that claims override authority is structurally incapable of knowing the session
    is closing. It is not ignoring the close; it was never given it.

So the model is obeying its instructions correctly. The close loses **by design**, because the
design is "last and loudest wins" and the close is neither.

The same mechanism is documented in-repo as a known failure MODE, in a different domain:
conversationState.ts:1395 — "a model given two opposite orders resolves them with a content-free
holding message — which the learner acknowledges again, forever." That is the mechanism behind
Phase 2 Section D's "Got it" loop. Contradiction is upstream of the loop.

## C. THE HIDDEN PRECEDENCE TABLE — ALREADY EXISTS, THREE TIMES, EACH INCOMPLETE

Three sites independently re-derive the same hierarchy as ad-hoc boolean conjunctions.
This is the single strongest piece of evidence that one authority is missing.

| suppressed-by →           | RECOVERY | CLOSING | EXCURSION | FIRST_LESSON | LEARNER_REQUEST |
|---------------------------|----------|---------|-----------|--------------|-----------------|
| `gateEligible` (route.ts:3473) — ASSESSMENT | YES `!recoveryKeyHoisted` | YES `!closingTurnWithholdsQuestion` | YES `!excursionActiveHoisted` | YES `!firstLessonActiveHoisted` | **NO** |
| `shouldRepairFillerTurn` (lessonCompletion.ts:340) | YES `recoveryTurn` | YES `closingTurn` | **NO** | **NO** | YES `respectsNewIntent` |
| `shouldInjectAffectClose` (sessionLifecycle.ts:~400) | **NO** | n/a | YES `excursionActive` | **NO** | YES `ambiguousTurn` |
| `buildTurnDirective` (conversationState.ts:1374) — TEACH | **NO** | **NO** | **NO** | param only | param only |

Every hole in that table is a Phase 2 REACHABLE finding:
  - TEACH row empty  -> C1 `CLOSING -> teaching` REACHABLE.
  - gateEligible has no LEARNER_REQUEST column -> C6 `VISUAL_REQUEST -> unrelated quiz` REACHABLE.
  - `shouldInjectAffectClose` has no RECOVERY column -> close block + recovery block co-emit.
The holes are not oversights in three places. They are the predictable result of no one owning
the table.

## D. WHAT IS ALREADY CORRECT — DO NOT REBUILD

1. **`questionLegality.ts`** is a real, ordered-by-authority, subtractive gate — for exactly one
   question ("may this turn ASK?"). Its own comment: "bands are ordered by authority ...
   an explicit learner directive outranks a system-inferred diagnostic conclusion". KEEP. REUSE.
2. **EOS v2 §5.2** (`docs/architecture/EOS_V2_RUNTIME_SPECIFICATION.md:470-490`) already
   *specifies* a normative 7-band evaluation order, including Band 0 interrupt semantics
   ("its effect is the whole decision skeleton; bands 1–4 are SKIPPED"). Phase 3 must NOT invent
   a competing scheme; it reuses this vocabulary.
3. **`src/lib/kernel/policy`** implements that engine (`decide`), with a base pack covering
   bands 0-6, wired into route.ts at 3210 via `policyGate` — in **SHADOW ONLY**
   ("READ-ONLY in shadow — it has no path to the response or the DB", policyGate.ts:17).
   Promotion to primary is gated on **a human reviewing real-traffic replay diffs**
   (policyGate.ts:47-52, K4 Definition of Done). NOT this phase's call. NOT touched.
4. **`b2AskIllegal`** (basePack.ts) consumes `questionLegality`'s verdict as an input and
   explicitly refuses to restate it: "Restating QL-1…QL-4 as pack predicates would put the
   capability lattice in two places and guarantee they drift." That discipline is the model
   Phase 3 must follow.
5. **Post-model structured-output guards already work**: `closingTurnWithholdsQuestion` is
   consulted at both question sources (route.ts:3480, route.ts:4111); `withholdUngradedGateQuestion`
   strips ungradeable prose questions. These are VALIDATION, correctly placed. KEEP.

## E. THE AXIS DISCOVERY — WHY A SINGLE TOTAL ORDER WOULD BE WRONG

The suggested hierarchy (SAFETY > STOP > DISTRESS > GAP > REQUEST > TEACH > ASSESS > PROGRESSION)
assumes all competing concerns lie on one axis. Tracing says they do not, and the codebase already
says so in prose:

  route.ts:3060 — "The two blocks answer different questions and both keep their authority:
  RECOVERY still owns HOW to respond to distress ..., and this owns WHICH concept that response
  is about."

Classifying all 73 blocks by what they constrain yields **four independent axes**:

  AXIS 1 — TURN ACTION (mutually exclusive; only one may own the turn)
     RECOVER / CLOSE / ANSWER-REQUEST / ASSESS / TEACH / PLACEMENT-PROBE / COMPLETE
  AXIS 2 — SUBJECT (which concept the turn is about): excursion vs lesson. Orthogonal.
  AXIS 3 — MEDIUM (which figure, if any): visual contract. Orthogonal.
  AXIS 4 — REGISTER (how to acknowledge / what language): CUE directive, output language,
     acknowledgement instruction. Orthogonal.

Contradiction exists **only within Axis 1**. That is why 73 blocks coexist without 73-way conflict,
and it is why RECOVERY (Axis 1) and EXCURSION (Axis 2) can both be "injected LAST" without
actually fighting. A single flat ladder over all four axes would suppress blocks that are not in
conflict at all — e.g. it would strip the visual contract from a recovery turn, or strip the
Russian-language rule from a closing turn.

**Therefore the precedence contract is ONE total order over AXIS 1 ONLY**, with axes 2-4 declared
explicitly out of its scope. This is a deliberate, evidence-based narrowing of the suggested design.

## F. CONTRADICTION MATRIX (Axis 1 only; each cell = can both be instructed on one turn today?)

Legend: **X** = contradictory co-emission possible today (defect). `-` = already prevented, with the guard named.

|              | RECOVER | CLOSE | ANSWER-REQ | ASSESS | TEACH | PLACEMENT | COMPLETE |
|--------------|---------|-------|------------|--------|-------|-----------|----------|
| **RECOVER**  | —       | **X** | **X**      | - gateEligible | **X** | **X** | - shouldRepairFillerTurn |
| **CLOSE**    |         | —     | - shouldInjectAffectClose(ambiguous) | - gateEligible | **X** | **X** | - |
| **ANSWER-REQ**|        |       | —          | **X**  | - "overrides the turn move" (prose only) | **X** | - |
| **ASSESS**   |         |       |            | —      | - decideNextMove owns it | **X** | - |
| **TEACH**    |         |       |            |        | —     | **X** | - |
| **PLACEMENT**|         |       |            |        |       | —         | **X** |
| **COMPLETE** |         |       |            |        |       |           | — |

Confirmed defects to close (the X cells that are reachable and harmful), in evidence order:

  D1. CLOSE x TEACH        — route.ts:2314 vs 2894. Phase 2 C1. **Root cause proven in §B.**
  D2. CLOSE x prose question — TURN DIRECTIVE can order `nextMove:'ask'` on a CLOSING turn;
                              structured MCQ is stripped (4111) but prose is not. Phase 2 C2.
  D3. ASSESS x ANSWER-REQ  — `gateEligible` has no learner-request term. Phase 2 C6.
  D4. RECOVER x CLOSE      — `shouldInjectAffectClose` has no recovery term; both blocks emit.
  D5. RECOVER x TEACH      — NARROWER THAN FIRST WRITTEN, corrected after reading the source.
                              conversationState.ts:899 already short-circuits:
                              `if (ctx.recoveryTurn) return { move: 'teach' }` ("Recovery preempts
                              — the recovery script already forbids questions"). So recovery
                              cannot produce an ASK. What survives is a CONTENT conflict: the
                              TURN DIRECTIVE still emits its full phase frame ("show the idea
                              working", "The anchor MUST be drawn from <lesson>") against
                              recovery's "No new content this turn".
  D6. PLACEMENT x CLOSE / x ANSWER-REQ — corrected: route.ts:2381 DOES guard placement with
                              `!recoveryKeyHoisted`, so RECOVER x PLACEMENT is already prevented.
                              CLOSE and an active learner request are not in that guard.

  NOT a defect and deliberately excluded: RECOVER x EXCURSION, RECOVER x VISUAL, CLOSE x LANGUAGE —
  different axes (§E). Suppressing those would be a regression.

### F-bis. THE PRECEDENT THE FIX MUST FOLLOW (found while verifying D5)

`decideNextMoveDetailed` (conversationState.ts:894-899) ALREADY accepts a preemption input and
short-circuits the ladder on it:

    if (ctx.recoveryTurn) return { move: 'teach', blockedReason: null, rationale: null }

That is deterministic Axis-1 arbitration, in production, tested, for exactly one claimant. The
route passes `recoveryTurn` (route.ts:2576) and does NOT pass the episode phase — which is the
whole of §B restated as a missing function argument.

So Phase 3 is not introducing a new mechanism into this codebase. It is generalising one that
already exists and works, from a single hard-coded claimant to a declared, ordered set.

## G. MINIMUM PRECEDENCE HIERARCHY (derived; divergences from the suggested list are argued)

Axis-1 total order, highest first. Each rung cites the evidence that places it.

  0. **DEGRADED / PROVIDER FAILURE** — `isDegradedProvider`. Phase 2 C8 already BLOCKED
     (no advance, no mastery). Included so the ladder is total, not because it is broken.
  1. **RECOVERY** — basePack `B0.recovery.preempt.v1` is Band 0 and `mandatory: true`;
     decision-engine/03 §0; recoveryGuard.ts:710.
  2. **EXPLICIT STOP / CLOSE** — questionLegality QL-3 calls a stated learner directive
     "the one signal that is ground truth rather than inference".
  3. **ANSWER A DIRECT LEARNER REQUEST** — masteryGate.ts:602 "learner request outranks the
     machine's own pacing"; Series A Phase 4 made an outstanding question DEFER the close.
  4. **PLACEMENT PROBE**
  5. **ASSESS** (server-selected authored probe)
  6. **TEACH** (ladder move)
  7. **COMPLETE / PROGRESSION**

  **DIVERGENCE 1 — RECOVERY above CLOSE, not below.** The suggested order put STOP above DISTRESS.
  Repository evidence is unanimous the other way: recovery is the only Band-0 mandatory rule;
  it is the only block claiming total preemption; and it is appended after the close today, so
  under the positional convention it already wins. Educationally, a learner who types
  "I give up, I'm done" must be met first. This is a HOW/THAT split, not a contest:
  recovery owns the stance, and the episode stays CLOSING, so the session still ends —
  it ends warmly instead of abruptly. Nothing about the stop is discarded.

  **DIVERGENCE 2 — "KNOWLEDGE GAP / PREREQUISITE" is NOT a rung.** The suggested list places it
  4th. It cannot be placed: Phase 2 C5 found there is **no knowledge-gap state in the runtime at
  all** — a named gap is filed as distress and the named concept is discarded. Inventing a rung
  for a state that does not exist would be inventing the audit's missing details. Building that
  state is a different architectural layer and is explicitly out of scope (Step 8). RECORDED,
  NOT IMPLEMENTED.

  **DIVERGENCE 3 — ASSESS below REQUEST, and both below CLOSE.** Matches `gateEligible`'s existing
  four negations exactly; this phase adds the missing fifth term rather than reordering anything.

## H. WHAT PHASE 3 WILL AND WILL NOT DO

WILL: one pure module owning the Axis-1 order; every competing site reads its verdict instead of
re-deriving a private subset; losing blocks are ABSENT from the prompt rather than out-shouted.
Arbitration by absence — the LLM cannot resolve a contradiction it never receives.

WILL NOT: touch the shadow policy engine or its owner gate; reorder the 73 append sites;
widen any detector; add a knowledge-gap layer; move ownership out of turnIntent / sessionLifecycle /
conversationState / excursion / visual / masteryGate / provider.


---

## I. WHAT WAS ACTUALLY BUILT (added after implementation, `5ae4295`)

The design changed in three evidence-driven ways between this audit and the commit. Recorded here
so the audit is not read as a spec the implementation quietly diverged from.

1. **The ladder lost two rungs.** DEGRADED and PLACEMENT were in §G's draft order. Tracing showed
   neither can claim: the degraded path runs AFTER the provider call fails (route.ts:4009) and
   replaces the whole turn, so there is no block for it to outrank; and placement's recovery
   collision was already guarded, while its others are closed by making it a CONSUMER of
   `NEW_QUESTION` — which also keeps the verdict computable ONCE rather than twice. Shipped order:
   `RECOVERY > LEARNER_REQUEST > CLOSE > COMPLETE > TEACH`.

2. **Suppression is per-CAPABILITY, not per-block.** §H's "losing blocks are ABSENT" is right about
   Axis-1 content and wrong if applied to whole blocks: the TURN DIRECTIVE's length budget,
   new-term ceiling and register are Axis 3/4 and must survive a close or a recovery — the very
   turns where an unbounded response does most harm. Six capabilities are declared
   (`PHASE_FRAME`, `NEXT_MOVE`, `NEW_QUESTION`, `AUTHORED_PROBE`, `SESSION_CLOSE`,
   `FILLER_REPAIR`); a block loses only what genuinely conflicts.

3. **A seventh defect was found in Step 5, not Step 0.** The false-completion nudge appends
   "…let's do 2 practice questions together — ready?" after every prompt-side protection has run.
   It is the last post-model question source and was unguarded. Safe to suppress because completion
   is server-gated, so the stripped claim cannot become a real completion.

**Known limit, unchanged and unhidden.** The post-model prose-question withhold removes whole
PARAGRAPHS (`dropAnswerableContent`: half a question is still a question). When an entire closing
turn is ONE paragraph ending in a question, nothing is separable — the guard does nothing and logs
`closing-turn-was-entirely-a-question` rather than substituting an invented close. Phase 2's C2 is
narrowed, not eliminated.

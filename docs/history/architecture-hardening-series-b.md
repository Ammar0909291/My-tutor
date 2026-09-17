# Architecture Hardening — Series B (history)

> Extracted verbatim from CLAUDE.md during the 2026-09-17 memory-file
> collapse (CLAUDE.md kept to <500 lines of live rules). Dated entries below
> are historical record — read them for context, not as live instructions.
> Live rules remain in CLAUDE.md; see docs/history/INDEX.md for the full map.

## Architecture hardening — Series B (2026-08-23)
- **TWO phase series ran on 2026-08-23 and both number from Phase 1.** Read this before
  interpreting any "Phase N" reference from that date. Series A = Phase 0-4, TurnDecision /
  decision ownership / ambiguity (`5741148`..`34f15fa1`, blueprint §28). Series B = architecture
  hardening: Phase 1 stop persistence (`ceb7bd3`), Phase 2 cross-turn characterisation
  (`feabc4c`), Phase 3 turn arbitration (`5ae4295`, blueprint §29). The collision already cost one
  session handoff its bearings.
- **Phase 3 — turn arbitration.** `src/lib/teaching/turnArbitration.ts` is now the SINGLE
  statement of which educational action owns a turn:
  `RECOVERY > LEARNER_REQUEST > CLOSE > COMPLETE > TEACH` (floor, always claims). Seven prompt
  blocks used to assert authority over "everything above" in English, resolved by the model;
  three call sites each kept a different incomplete copy of the same precedence order, and every
  hole in them was a measured-reachable defect. Losing actions are now ABSENT from the prompt
  rather than out-argued inside it. Suppression is per-CAPABILITY, never per-block — a block's
  length budget and register are a different axis and must survive a close or a recovery.
  Consumers: TURN DIRECTIVE, `shouldInjectAffectClose`, placement probe, `gateEligible`,
  `shouldRepairFillerTurn`, the false-completion nudge, and the CONVERSATION block header.
- **Read `docs/architecture/PHASE3_ARBITRATION_AUDIT.md` before any Phase 4 work.** It is the
  Step 0 evidence (73 append sites, the 7 prose authority claims, the three-site table, the
  four-axis model, the contradiction matrix). Committed specifically because Phase 1/2's own
  cited audit was NOT committed, and when that session hit its usage limit Phase 3's scope became
  unrecoverable from the repository.
- **Known open items, measured not guessed:** (1) the post-model prose-question withhold is
  PARAGRAPH-scoped, so a closing turn that is one paragraph ending in a question is logged and
  left alone rather than repaired with invented copy; (2) no knowledge-gap state exists in the
  runtime at all (Phase 2 C5) — a named gap is filed as distress and the concept discarded, so
  that rung could not be built and is reported, not patched around; (3) `src/lib/kernel/policy`'s
  7-band engine remains in SHADOW, and promoting it is an owner decision gated on reviewing
  real-traffic replay diffs (K4 DoD) — deliberately untouched.
- **Phase 4 — knowledge gap is now first-class** (`410a7aee`, merged with a parallel-session
  Track K/EOS commit at `2b524ed6`, blueprint/audit: `docs/architecture/PHASE4_KNOWLEDGE_GAP_AUDIT.md`).
  A learner naming a concept they are missing ("I don't know enough about the mole concept") used
  to be read only as the failure-state PREDICATE (`dont_know`) — the named OBJECT was discarded,
  so the turn spent the affect budget and wrote a MistakeRecord against the LESSON concept, not
  the one the learner actually named. `knowledgeGap.ts` (new, no detector, no regex — reuses
  `isDontKnowSignal` + the existing `resolveRequestedConceptId`) classifies a RESOLVED gap only;
  it opens the EXISTING excursion machine as a prerequisite detour (one new disjunct in
  `decideExcursion`'s open condition, gated on `knowledgeGapConceptId === requestedConceptId`) and
  claims a new `KNOWLEDGE_GAP` rung at the TOP of Phase 3's ladder (denies `RECOVERY_SCRIPT` so the
  prerequisite actually gets taught; nothing below it was reordered). Also fixed:
  `remediationCount` had one writer and no reset ever — cleared now on the same graded-correct
  evidence that already clears `consecutiveFailures`. SCOPE, decided by the owner: only concepts
  the KG resolver can already title are handled — "compound structures", "atoms", "periodic table"
  still fall through unchanged (recovery, budget spent). Carrying an unresolvable name is Phase 5.
  Live-verified: `[knowledge-gap]`/`[excursion]`/`[arbitration]` logs confirm the chain in
  production. One PRE-EXISTING `recoveryGuard` gap found live (not fixed, out of scope): "I still
  don't know about X" doesn't match `dont_know` at all (the word "still" breaks the pattern) — no
  harm resulted because the excursion's own continuity and `gateEligible`'s existing
  `!excursionActiveHoisted` exclusion both independently absorbed it.
- **Phase 5 — Lesson Integrity, Evidence & Progression** (2026-08-24, commit range starting
  after `1929e8c1`; audit: `docs/architecture/PHASE5_LESSON_INTEGRITY_AUDIT.md`). Full read-only
  audit (owner/reader/writer/persistence/authority/conflicts for all 12 lesson-loop surfaces)
  found the grading/evidence architecture already correct for 5 of 7 required failure cases (A,
  B, C, E, F) — `gradeMcqAnswer` deterministic ground-truth grading, `answerableTurn.ts`'s
  no-question-posed suppression, `isBareAcknowledgement` nulling the WHOLE signal on a bare ack
  regardless of what was asked, `masteryVerifiedStrict` reading only verified counters,
  `pendingMcq` written post-arbitration so it can't go stale — all re-verified with new
  characterization tests (`phase5CaseCharacterization.test.ts`, 26 tests) rather than assumed.
  Two genuine defects found and fixed, both minimal, both reusing existing mechanisms (no new
  parallel state machine, no new detector):
  1. **Case D — filler-repair could loop the identical canned sentence forever.**
     `ConversationState.fillerRepairStreak` (new counter, folds exactly like
     `consecutiveFailures`/`consecutiveDontKnows`) + `shouldApplyFillerRepair` (caps the
     EXISTING repair at 2 consecutive filler-shaped turns, then lets the model's own text stand
     rather than force a third identical robotic question). Counts consecutive FILLER-SHAPED
     turns, not consecutive repairs — an early design that counted repairs instead re-armed
     every other turn instead of staying suppressed while the model kept producing filler; found
     and corrected via a negative-control test before shipping. `transcriptReplayFramework.test.ts`
     extended to replay it (the transcript already carries the tutor's own text, so no
     approximation was needed) — this closed a structural-guard test (`replayDrift.test.ts`) that
     would otherwise have let this field silently drift between the harness and the route.
  2. **Case G — two of the six audited edge-case phrasings were genuine defects, four were
     already correct.** `recoveryGuard.ts`'s bare `dont_know` pattern was the ONE negated-verb
     pattern in the file with no optional intensifier group, while ten sibling patterns already
     had one (scared: really|so; the sibling `dont_understand` pattern: really|just; its "get
     it" variant: still) — so "I still don't know enough about the mole concept" (the exact R3
     gap Phase 4 recorded and deferred) matched nothing; fixed by adding `(really|still|just)?`,
     words already used elsewhere in the same file, to the one outlier. Separately,
     `visual/session.ts`'s `TOPIC_REQUEST_RE` (shared verbatim by `isExplicitTopicRequest` in
     `excursion.ts` and the visual layer) had "I want to learn X" but not "I need to learn X" —
     added as a synonym. The other four phrasings ("compound structures", bare "I don't know",
     "I really don't understand this", "atoms") are CORRECTLY unresolved as-is: the KG genuinely
     has no such title (checked directly against the live KG, not assumed) and the resolver's
     refusal to guess is the same anti-guessing discipline the L1 fix established — extending
     resolution to guess at these would be a regression, not a fix.
  One residual, structurally-hard gap reported honestly, not fixed (STILL UNKNOWN): a genuinely
  free-response (non-MCQ) prose question, below asset-contract probe coverage, where the model's
  self-report is internally self-consistent (`signalVerification` reports CLEAN) but factually
  wrong. Closing it needs either full probe coverage (content work, protected) or a new
  independent answer-verification subsystem (explicitly out of scope — "another parallel state
  machine" / "making the model answer better"). Adversarial review (topic-change mid-remediation,
  prerequisite-of-a-prerequisite, diagram request during remediation, "I'm done" during a detour,
  provider failure during a detour) found no new defect; one cosmetic-only finding
  (`classifyKnowledgeGap`'s `lessonPrerequisites` are always the ORIGINAL lesson's, not the
  current excursion target's, so a prerequisite-of-a-prerequisite is labeled `relationship:
  'related'` instead of `'prerequisite'` — does not affect `gapOpensThisConcept`, which only
  compares concept ids, so no wrong excursion results; not fixed, telemetry-only). Live-verified
  against the deployed app with one disposable account (Physics: wrong MCQ answer left
  check/practice at 0/0 and did not authorize `[LESSON_COMPLETE]`, four repeated acknowledgements
  never moved mastery counters even as the delivery phase legitimately advanced; Chemistry:
  knowledge-gap detour taught the mole concept with `mastery.verified: false` for the parent
  lesson throughout, then returned to the lesson topic; English: misunderstanding → remediation
  → acknowledgement (one turn served `provider: "memory"`, curated content, and still fabricated
  no mastery) → a genuine on-topic follow-up question, proving the tutor was not stuck) — account
  deleted afterwards, re-login confirmed blocked. One live-run assertion (this script's own G-1
  check, copied from Phase 4's harness) read FAIL and was diagnosed as a test miscalibration, not
  a product defect: the gap turn legitimately attached an MCQ ABOUT the gap concept itself
  (teach-then-check), not about the parent lesson — recorded rather than silently adjusted.
  Full suite 423 files / 9,113 passed / 9 skipped, `npx tsc --noEmit` clean, `npm run build`
  clean. Track K/S5 untouched; Phase 1-4 invariants re-verified intact, not reopened.



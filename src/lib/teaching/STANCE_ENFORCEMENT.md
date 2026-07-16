# Stance Enforcement (Claude Recommendation #6)

Moves teaching-policy laws out of prompt prose and into deterministic runtime
enforcement, so they hold regardless of which LLM renders a turn. This is an
audit + a thin composition layer, not a new teaching pipeline — see
`stanceEnforcement.ts` for the code; this file records what was already
enforced before this change vs. what it adds, and what is intentionally still
left to prompts.

## Audit: teaching laws and their enforcement source

| Law | Enforced by | Status before this change | What this change adds |
|---|---|---|---|
| Student cannot advance without evidence | `conversationState.ts` phase ladder (`correctAtCheck`/`correctAtPractice`, folded only from parsed SIGNAL outcomes) | Already deterministic | Reused as-is |
| "I understand" is not proof of mastery | `masteryGate.ts` `isBareAcknowledgement` (upstream, discards SIGNAL evidence for bare acks before folding) | Already deterministic | Reused as-is |
| Lesson completion requires mastery, not conversation completion | `masteryGate.ts` `gateLessonCompletion`/`masteryVerified` (strips `[LESSON_COMPLETE]` unless `correctAtCheck >= 1 && correctAtPractice >= 2`) | Already deterministic | `enforceStance` wraps it as `FALSE_MASTERY_COMPLETION`, the single chokepoint the mission asks for |
| Every explanation must be followed by an appropriate mastery check | `conversationState.ts` `decideNextMove` decides *when* a check is due | Decision was deterministic; whether the model's rendered text actually complied was previously unverified — prompt-only | New: `UNSUPPORTED_EXPLANATION` — verifies a server-decided `'ask'` move actually produced a question in the rendered text, using the same `repliesWithQuestion` detector the state machine itself uses |
| A misconception cannot be marked resolved without successful evidence | No prior runtime check existed; entirely prompt-only | Prompt-only | New: `MISCONCEPTION_UNVERIFIED` — flags a resolution claim in the rendered text when `misconceptionDetectedThisLesson` is true but `masteryVerified(state)` is still false. Reuses the same mastery bar as completion; no second mastery model |

## What this module does NOT change

- No new mastery model, no new evidence schema, no new DB writes/reads.
- No second invocation path into the EOS K5 Output Verifier (flag-gated,
  off by default) — kept separate to avoid a parallel architecture.
- School Mode is entirely untouched (`enforceStance` only runs in the
  `!schoolCtx` branch of `route.ts`).
- `misconceptionDetectedThisLesson` is a cheap, per-turn boolean sourced
  from the already-parsed SIGNAL `phrase` field — not a call into Student
  Intelligence's richer, cross-session `MisconceptionState.activity`
  classifier (that remains available as a future, deeper source for the
  same input without changing this module's contract).

## Teaching laws still enforced only by prompts (not by this layer)

- Explanation *quality* beyond "did a check follow it" — depth, accuracy,
  register, vocabulary pacing (K5's other rules cover some of this, but K5
  is flag-gated off by default).
- The exact wording nuance of a misconception-resolution claim beyond the
  narrow `RESOLUTION_CLAIM_RE` backstop — this is deliberately narrow to
  avoid false positives, not a general sentiment classifier.
- Praise calibration, paragraph length, capitalization/formatting rules
  (K5 rules V-CAP, V-PRAISE, V-LEN, V-REACT) — all flag-gated, not part of
  this always-on layer.
- Cross-session misconception dormancy/recurrence reasoning (Student
  Intelligence) — descriptive/batch only, not consulted per-turn.

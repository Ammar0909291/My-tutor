# Acknowledgement predicates — ownership investigation

Census target #2 (OWNERSHIP_CENSUS_2026-09-01 §B1): two predicates answer
"is this message a substantive learner contribution?" and disagree on 31% of a
35-utterance corpus. The mission's instruction for this area is explicit:
**investigate, determine, and consolidate only where the semantics justify —
do not blindly merge.** This is the determination.

## The two predicates

| predicate | file | shape | question it answers |
|---|---|---|---|
| `isBareAcknowledgement` | `masteryGate.ts` | whole-message exact match against `ACK_PHRASES` | "is the message EXACTLY a bare acknowledgement" |
| `isLowSignalAcknowledgement` | `conversationState.ts` | strip politeness + filler, then `LOW_SIGNAL_TOKENS_RE` over a repeat of tokens, ≤10 words, no `?` | "after stripping politeness/glue, is this a low-signal receipt" |

They are **different questions**, not two copies of one. The strict one is used
where a false positive is costly (discarding a real contribution); the looser
one is used where a receipt must still move the delivery ladder even when it
carries natural glue ("ok, i think i follow so far").

## Measured disagreement (the real predicates, `scratchpad/ack_probe.ts`)

Over the census corpus + ambiguous single-word answers: both=16, **bare-ONLY=2**
("thanks", "done"), **low-ONLY=11** ("i see", "yeah that makes sense", "i
follow", "ok what next", "mhm", "right", …), neither=1.

- **low-ONLY**: the looser predicate catches natural multi-word receipts the
  strict one misses. These are the utterances the three commits `3ee4ec1` /
  `1ad473c` / `393073b` widened the *ladder* predicate to catch — correctly, and
  in the ladder's own file. That is the "fixing one utterance at a time" the
  census named; it was widening the RIGHT owner, not evidence the two must merge.
- **bare-ONLY**: "thanks"/"done" are stripped as politeness by the ladder
  predicate's `stripAddressTokens`, a deliberate measured choice
  (`politeRegisterDetectors.test.ts`), so the ladder treats them as noise.

## Who owns which decision, and why they do NOT merge

The high-stakes decisions already have ONE owner — the ladder predicate:

- **Grading (does this turn's SIGNAL touch the ladder?)** — `route.ts` nulls the
  signal on `isLowSignalAcknowledgement`. A prior session switched this here FROM
  `isBareAcknowledgement` specifically to "make the two agree by construction"
  (the demotion bug where "I understand" was graded). The ladder predicate is the
  owner.
- **Ladder delivery-phase advancement** — reads `isLowSignalAcknowledgement`.
- **Memory-serving (`serveFromMemory`)** — reads BOTH `answersProseQuestion`
  (strict) AND `ackToQuestion` (= `isLowSignalAcknowledgement`), ANDed. For every
  low-ONLY receipt the ladder predicate is true, so it **masks** the strict
  predicate's miss: the outcome is identical whichever fires. Verified
  (`scratchpad/ack_mask.ts`): the ladder catches all 11 low-ONLY receipts.

The strict `isBareAcknowledgement` remains the right owner for its own,
different question — "is the whole message nothing but a bare ack" — at the
completion-tag strip (`stripCompletionOnBareAcknowledgement`, School Mode), the
CUE `studentIntent` read, and the metrics `learnerReplySubstantive`. There a
false positive on an ambiguous token is the costly error.

## Why a merge is the WRONG move here (unlike the mastery verdict)

- The disagreement is **masked at the high-stakes sites** (grading uses the
  ladder predicate; memory-serving ANDs both). No reachable contradictory
  teaching state was found at those sites.
- The remaining disagreements sit on **genuinely ambiguous tokens**: "right" is
  a receipt ("I see") OR an affirmative answer ("yes, correct") depending on what
  was asked; "done" likewise. Forcing either predicate onto the other's sites
  would REGRESS these — trading a masked, harmless raw-predicate difference for a
  real misclassification. That is exactly the "we fixed this bug ≠ the
  architecture no longer permits this class of bug" trap.
- Prior sessions already resolved the one decision that genuinely needed one
  owner (grading) and share `stripAddressTokens` between the two politeness-deaf
  detectors. The architecture is already correct; it was not documented as such.

## What is enforced instead (`acknowledgementOwnership.test.ts`)

1. The grading-null gate reads the **ladder** predicate, not the strict one — a
   structural pin so a future edit cannot re-fork it back (the exact regression
   the demotion fix closed).
2. `serveFromMemory` ANDs `ackToQuestion` alongside `answersProseQuestion` — the
   masking invariant. If someone removes it believing the prose detector covers
   the receipts, the newly-exposed divergence is caught.
3. The corpus characterization: the two predicates are DISTINCT (strict ⊄ loose
   and loose ⊄ strict), so no future reader treats them as interchangeable, and
   the ladder catches every low-ONLY receipt (the masking premise).

Net: census target #2 is resolved by **documenting one owner per decision and
pinning the reconciliation**, not by a merge the semantics do not justify.

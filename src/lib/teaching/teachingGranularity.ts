/**
 * Teaching granularity — how COMPLETE an explanation this turn should be.
 *
 * ── The defect this fixes ────────────────────────────────────────────────
 *
 * Production evidence, seven consecutive assistant turns in one lesson
 * (2026-08-07 19:26–19:31Z, all 113–183 characters):
 *
 *   "Notice how the length of that arrow on your screen tells you how far…"
 *   "Now, just like that arrow needs both how long it is and where it points…"
 *   "Building on that idea of the wind blowing with both a speed and…"
 *   "So you're saying you have seen an arrow shot from a bow — have I got…"
 *   "Mohammad Suaib, since a vector's size is measured using standard units…"
 *   "Look at the 3D Vector Visualization… Which part tells us its size?"
 *   "So you're saying the total length of the arrow represents the…"
 *
 * One sentence per turn, most of them ending in a question. The learner has
 * to press through seven exchanges to receive what is, in substance, a
 * single paragraph. That is the reported "Viscosity… is… the… internal…
 * resistance…" experience — the fragmentation is ACROSS turns, not inside
 * one message.
 *
 * ── Why it happens ──────────────────────────────────────────────────────
 *
 * Every length instruction in the prompt layer pushes ONE WAY. The turn
 * directive says "at most N short paragraphs. If the learner is struggling,
 * shorter is better — never longer." responseBudget() only ever lowers the
 * ceiling. Nothing anywhere states a FLOOR, and nothing says a definition
 * must arrive whole. Brevity was enforced; completeness was not expressed at
 * all. Verified by search before writing this module.
 *
 * So this is not a model failure to correct with a stronger scolding — it is
 * a missing rule. The fix states the floor.
 *
 * ── The three levels ────────────────────────────────────────────────────
 *
 * COMPLETE (default) — a definition is one whole natural sentence, then
 *   explanation. This is where a learner who is doing fine should always be.
 * GUIDED — split into meaningful IDEAS, never words. One wobble.
 * REMEDIAL — the smallest steps, only after genuine, evidenced confusion.
 *
 * The ladder is one-directional per turn and evidence-gated: REMEDIAL is
 * unreachable without a real confusion signal, which is what stops the tutor
 * drifting into word-by-word teaching for a learner who never struggled.
 *
 * Pure module: no I/O, no clock, no DB. Same input, same output, always.
 */

import type { ConversationState } from '@/lib/teaching/conversationState'

export type TeachingLevel = 'COMPLETE' | 'GUIDED' | 'REMEDIAL'

export interface GranularityInputs {
  /** The conversation state machine's own evidence counters. */
  state: ConversationState | null
  /** detectLearnerRequest() output for this turn. */
  learnerRequest?: 'diagram' | 'real_life_example' | 'explain_differently' | null
  /** How many times THIS concept has already triggered explain_differently. */
  remediationTier?: number
  /** recoveryGuard key — set only on a genuine distress utterance. */
  recoveryKey?: string | null
  /**
   * The PREVIOUS turn's `<!--SIGNAL confusion="…">` read (snapshot.lastSignal).
   *
   * F3: this field is the only confusion evidence that is not a fixed phrase
   * list. `detectLearnerRequest`'s EXPLAIN_DIFF_RE and `detectFailureState`'s
   * families between them enumerate specific wordings; measured against 36
   * natural confusion utterances, 21 matched NEITHER — "too fast", "I feel
   * lost here", "that went over my head", "can you break that down", "I need
   * it simpler", "nothing is making sense" — and so lowered nothing. The
   * SIGNAL exists precisely so the model can report the confusion a regex
   * cannot enumerate, and it was being parsed, logged, used to gate the
   * misconception block, and then dropped before it could reach any teaching
   * decision.
   *
   * It is deliberately NOT folded into `consecutiveFailures`. Confusion is not
   * a wrong answer: that counter feeds mastery accounting and the session
   * affect budget (2 visible failures → CLOSING), so counting confusion as
   * failure would end sessions the learner never failed. It lowers
   * granularity only.
   */
  signalConfusion?: boolean | null
}

/**
 * Decide the turn's granularity.
 *
 * REMEDIAL requires EVIDENCE of confusion, never a guess:
 *   · two consecutive wrong answers, or
 *   · a repeated "explain it differently" on the same concept, or
 *   · a recovery-guard distress utterance.
 * A learner who simply asked a question, or asked once for a different
 * explanation, is NOT confused — they get GUIDED at most.
 */
export function decideTeachingGranularity(input: GranularityInputs): TeachingLevel {
  const failures = input.state?.consecutiveFailures ?? 0
  const tier = input.remediationTier ?? 0

  const confused = input.signalConfusion === true

  // Genuine, evidenced confusion — the only way into word-level teaching.
  if (input.recoveryKey) return 'REMEDIAL'
  if (failures >= 2) return 'REMEDIAL'
  if (input.learnerRequest === 'explain_differently' && tier >= 2) return 'REMEDIAL'
  // Reported confusion ON TOP OF a wobble or a prior re-explanation is the
  // same weight of evidence as two failures: the learner has now missed once
  // AND said so. Confusion alone is not enough to reach word-level teaching.
  if (confused && (failures >= 1 || tier >= 1)) return 'REMEDIAL'

  // One wobble: slow down to ideas, but never to words.
  if (failures === 1) return 'GUIDED'
  if (input.learnerRequest === 'explain_differently') return 'GUIDED'
  // A single reported confusion, with nothing else against the learner: drop
  // to ideas, never to words — the same treatment a first "explain it
  // differently" already gets, which is what this signal is a synonym for.
  if (confused) return 'GUIDED'

  return 'COMPLETE'
}

const DEFINITION_RULE =
  '- DEFINITION RULE: when you state what something IS, state it as ONE ' +
  'complete, natural sentence — the whole idea, subject and all ' +
  '("Viscosity is the internal resistance of a fluid to flow."). Never ' +
  'deliver a definition as fragments, never spread one across several ' +
  'turns, and never stop mid-idea to ask whether they are following. ' +
  'Finish the thought, THEN teach around it.'

const LEVEL_LINES: Record<TeachingLevel, readonly string[]> = {
  COMPLETE: [
    DEFINITION_RULE,
    '- Granularity: COMPLETE. Speak in whole thoughts. Give the definition, ' +
      'then explain it naturally with a concrete example and the figure on ' +
      'screen. Normal conversation — not a drip-feed.',
    '- Do NOT break this turn into a single short sentence that defers the ' +
      'rest to the next turn. The length budget above is a ceiling, not a ' +
      'target: use enough of it to land one complete idea.',
  ],
  GUIDED: [
    DEFINITION_RULE,
    '- Granularity: GUIDED. Break the explanation into meaningful IDEAS — ' +
      'never into individual words or half-sentences. Each part you deliver ' +
      'must stand on its own as something the learner can understand.',
  ],
  REMEDIAL: [
    '- Granularity: REMEDIAL. This learner has shown genuine confusion, so ' +
      'go to the smallest useful step: one term, one idea, checked before ' +
      'moving on. Even here, each step is a complete thought — a term is ' +
      'introduced WITH its meaning, never as a bare word.',
  ],
}

/** Prompt lines for the level. Empty string is never returned. */
export function buildGranularityDirective(level: TeachingLevel): string {
  return LEVEL_LINES[level].join('\n')
}

/**
 * EXPERIMENTAL — AI LEARNER-INTENT INTERPRETER (Architecture B of a controlled
 * A/B experiment, 2026-09-25). OFF for every learner by default.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * The deterministic reading (`turnIntent.ts` → `learnerMove.ts`) is regex/
 * phrase-list based. Phase-0 of this experiment ran it over the benchmark
 * follow-ups and found two that it misreads:
 *   - "Give me a concrete non-Set example of a topos, like sheaves on a
 *     topological space." → `learnerRequest = 'real_life_example'`, which
 *     injects masteryGate's REAL_LIFE_EXAMPLE directive ("ONE vivid everyday
 *     scenario … No definitions this turn") — the opposite of what was asked.
 *   - "Give me the second-order energy correction and explain why it's
 *     negative for the ground state." → UNINTERPRETABLE (no '?', no WH-word),
 *     so the turn runs the phase template and the new-concept budget line
 *     ("if the learner asks about one, name it in a clause and move on").
 * The experiment asks whether a small, bounded AI reading of the same message
 * fixes that without touching any authority.
 *
 * ── WHAT THIS IS NOT ────────────────────────────────────────────────────────
 * NOT an authority. Its output is ADVISORY PROMPT TEXT and nothing else:
 *   - it never grades, never decides correctness, never sees an answer key;
 *   - it never decides mastery, progress, completion or evidence;
 *   - it never feeds `arbitrateTurn`, `decideNextMoveDetailed`, question
 *     legality, the visual resolver, or any state fold/persist.
 * This module imports no database, evidence-spine, grading or state module —
 * `learnerIntentInterpreter.test.ts` fails the build if one appears. The AI
 * call is INJECTED (`IntentCaller`), so the module itself performs no I/O.
 *
 * ── FAILURE = ARCHITECTURE A ────────────────────────────────────────────────
 * Timeout, provider error, malformed JSON, unsupported enum member, or low
 * confidence all yield `intent: null`, and a null intent means the caller
 * appends nothing: the turn is byte-identical to Architecture A's prompt.
 */

/** Closed. What the learner is doing with this message. */
export const LEARNER_INTENT_KINDS = [
  'FOLLOW_UP',   // asks for more on the current topic or a named sub-topic
  'CORRECTION',  // challenges / corrects something the tutor said
  'REDIRECT',    // explicitly asks to leave the current path for another
  'CLARIFY',     // asks what a term / step / previous statement meant
  'ANSWER',      // is answering the tutor's question
  'ACKNOWLEDGE', // "ok", "got it", "continue"
  'OTHER',       // anything else (distress, stop, off-topic, chit-chat)
] as const
export type LearnerIntentKind = (typeof LEARNER_INTENT_KINDS)[number]

/** Closed. The form of response the learner asked for. */
export const REQUESTED_ACTIONS = [
  'CONCRETE_EXAMPLE',
  'DERIVATION',
  'EXPLAIN_WHY',
  'MORE_DEPTH',
  'SIMPLER',
  'COMPARE',
  'APPLY',
  'VERIFY_CLAIM',
  'REVISIT',
  'DEFINE',
  'NONE',
] as const
export type RequestedAction = (typeof REQUESTED_ACTIONS)[number]

/** Kinds that carry an explicit learner direction the prompt should honour. */
const ACTIONABLE_KINDS: ReadonlySet<LearnerIntentKind> = new Set([
  'FOLLOW_UP', 'CORRECTION', 'REDIRECT', 'CLARIFY',
])

/** Below this the reading is discarded (Architecture A continues). */
export const MIN_CONFIDENCE = 0.6
/** Hard ceiling on the interpreter's wall clock. */
export const DEFAULT_TIMEOUT_MS = 4000
const MAX_TARGET_CHARS = 120

/** The typed reading. Interpretation only — it carries no instruction to execute. */
export interface LearnerIntent {
  readonly kind: LearnerIntentKind
  /** What the request is about, in the learner's own terms ("sheaves on a topological space"). Null when none named. */
  readonly target: string | null
  readonly requestedAction: RequestedAction
  /** The model's self-rated confidence, 0..1. Used only to discard weak readings. */
  readonly confidence: number
}

export type InterpretOutcome =
  | 'ok'             // parsed, supported, confident, actionable
  | 'not_actionable' // parsed fine, but ANSWER / ACKNOWLEDGE / OTHER — A's reading stands
  | 'low_confidence'
  | 'malformed'
  | 'unsupported'
  | 'timeout'
  | 'error'
  | 'skipped'        // no learner text (ephemeral turn)

export interface InterpretResult {
  /** Non-null only when outcome === 'ok'. */
  readonly intent: LearnerIntent | null
  readonly outcome: InterpretOutcome
  readonly latencyMs: number
}

/** Bounded interpretation context. Everything is truncated before it is sent. */
export interface IntentContext {
  readonly subject: string
  readonly lessonTitle: string | null
  readonly teachingPhase: string | null
  /** Chronological, most recent last. Only the last 4 are used, each truncated. */
  readonly recentMessages: ReadonlyArray<{ readonly role: 'user' | 'assistant'; readonly content: string }>
  /** The question currently on screen, if any (text only — never its key). */
  readonly pendingQuestion: string | null
  readonly latestMessage: string
}

/** The one injected side effect: send (system, user) to a model, get text back. */
export type IntentCaller = (systemPrompt: string, userPrompt: string, timeoutMs: number) => Promise<string>

const MAX_MESSAGE_CHARS = 700
const MAX_TURNS = 4

function clip(s: string, n: number): string {
  const t = s.replace(/\s+/g, ' ').trim()
  return t.length > n ? `${t.slice(0, n)}…` : t
}

export const INTENT_SYSTEM_PROMPT = [
  'You classify what a learner is trying to accomplish with their LATEST message to a tutor.',
  'You do NOT answer the learner, grade anything, or decide what the tutor should teach.',
  'Reply with ONE JSON object and nothing else:',
  '{"kind": <one of ' + LEARNER_INTENT_KINDS.map((k) => `"${k}"`).join(', ') + '>,',
  ' "target": <short phrase naming what the request is about, in the learner\'s terms, or null>,',
  ' "requestedAction": <one of ' + REQUESTED_ACTIONS.map((a) => `"${a}"`).join(', ') + '>,',
  ' "confidence": <number 0..1>}',
  'Guidance: FOLLOW_UP = asks for more on the topic or a named sub-topic (an example, a derivation, a why, more depth).',
  'CORRECTION = says or suggests the tutor stated something wrong. REDIRECT = explicitly asks to switch to something else.',
  'CLARIFY = asks what a term, step or earlier statement meant. ANSWER = responds to the tutor\'s question.',
  'ACKNOWLEDGE = "ok", "got it", "continue". OTHER = anything else, including distress or wanting to stop.',
  'A message that answers a pending question is ANSWER even if phrased as a question.',
].join('\n')

export function buildIntentUserPrompt(ctx: IntentContext): string {
  const recent = ctx.recentMessages.slice(-MAX_TURNS)
    .map((m) => `${m.role === 'user' ? 'LEARNER' : 'TUTOR'}: ${clip(m.content, MAX_MESSAGE_CHARS)}`)
    .join('\n')
  return [
    `Subject: ${clip(ctx.subject, 60)}`,
    `Lesson: ${ctx.lessonTitle ? clip(ctx.lessonTitle, 120) : '(unknown)'}`,
    `Teaching phase: ${ctx.teachingPhase ?? '(unknown)'}`,
    `Question currently on screen: ${ctx.pendingQuestion ? clip(ctx.pendingQuestion, 300) : '(none)'}`,
    'Recent conversation:',
    recent || '(none)',
    '',
    `LATEST LEARNER MESSAGE: ${clip(ctx.latestMessage, MAX_MESSAGE_CHARS)}`,
  ].join('\n')
}

/**
 * Strict parse. Returns `{ intent }` on success, or the failure outcome.
 * Tolerates a fenced block or leading prose around ONE JSON object (reasoning
 * models sometimes add it); rejects anything else.
 */
export function parseLearnerIntent(raw: string): { intent: LearnerIntent } | { outcome: 'malformed' | 'unsupported' } {
  if (typeof raw !== 'string') return { outcome: 'malformed' }
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start < 0 || end <= start) return { outcome: 'malformed' }
  let obj: unknown
  try {
    obj = JSON.parse(raw.slice(start, end + 1))
  } catch {
    return { outcome: 'malformed' }
  }
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return { outcome: 'malformed' }
  const o = obj as Record<string, unknown>
  if (typeof o.kind !== 'string' || typeof o.requestedAction !== 'string') return { outcome: 'malformed' }
  const confidence = typeof o.confidence === 'number' ? o.confidence : Number.NaN
  if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) return { outcome: 'malformed' }
  if (!(LEARNER_INTENT_KINDS as readonly string[]).includes(o.kind)) return { outcome: 'unsupported' }
  if (!(REQUESTED_ACTIONS as readonly string[]).includes(o.requestedAction)) return { outcome: 'unsupported' }
  let target: string | null = null
  if (typeof o.target === 'string' && o.target.trim() !== '' && o.target.trim().toLowerCase() !== 'null') {
    target = clip(o.target, MAX_TARGET_CHARS)
  } else if (o.target !== null && o.target !== undefined && typeof o.target !== 'string') {
    return { outcome: 'malformed' }
  }
  return {
    intent: Object.freeze({
      kind: o.kind as LearnerIntentKind,
      target,
      requestedAction: o.requestedAction as RequestedAction,
      confidence,
    }),
  }
}

/** Classify a parsed reading into the outcome the caller acts on. */
export function gradeReading(intent: LearnerIntent): InterpretOutcome {
  if (intent.confidence < MIN_CONFIDENCE) return 'low_confidence'
  if (!ACTIONABLE_KINDS.has(intent.kind)) return 'not_actionable'
  return 'ok'
}

class IntentTimeout extends Error {}

/**
 * Run the interpreter. NEVER throws: every failure is an outcome with
 * `intent: null`, which the caller treats as "use Architecture A".
 */
export async function interpretLearnerIntent(
  ctx: IntentContext,
  call: IntentCaller,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
  now: () => number = Date.now,
): Promise<InterpretResult> {
  const t0 = now()
  const done = (outcome: InterpretOutcome, intent: LearnerIntent | null = null): InterpretResult =>
    Object.freeze({ intent, outcome, latencyMs: now() - t0 })
  if (!ctx.latestMessage || ctx.latestMessage.trim() === '') return done('skipped')
  let timer: ReturnType<typeof setTimeout> | undefined
  let raw: string
  try {
    raw = await Promise.race([
      call(INTENT_SYSTEM_PROMPT, buildIntentUserPrompt(ctx), timeoutMs),
      new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new IntentTimeout()), timeoutMs) }),
    ])
  } catch (err) {
    return done(err instanceof IntentTimeout ? 'timeout' : 'error')
  } finally {
    if (timer) clearTimeout(timer)
  }
  const parsed = parseLearnerIntent(raw)
  if ('outcome' in parsed) return done(parsed.outcome)
  const outcome = gradeReading(parsed.intent)
  return outcome === 'ok' ? done('ok', parsed.intent) : done(outcome)
}

/**
 * Arbitration owners under which the advisory block may be appended. RECOVERY
 * and KNOWLEDGE_GAP (affect / named gap) and CLOSE / COMPLETE (session end)
 * keep full ownership — the interpreter never speaks over them.
 */
const OWNERS_THAT_ADMIT_INTENT: ReadonlySet<string> = new Set(['LEARNER_REQUEST', 'LEARNER_QUESTION', 'TEACH'])

export function intentAdmittedUnder(arbitrationOwner: string | null): boolean {
  return arbitrationOwner !== null && OWNERS_THAT_ADMIT_INTENT.has(arbitrationOwner)
}

const ACTION_TEXT: Record<RequestedAction, string> = {
  CONCRETE_EXAMPLE: 'a concrete, worked example of exactly that (a real instance from the subject itself, not an everyday analogy)',
  DERIVATION: 'the derivation / calculation itself, step by step',
  EXPLAIN_WHY: 'the reason why, stated directly',
  MORE_DEPTH: 'more depth on exactly that point',
  SIMPLER: 'a simpler explanation of exactly that point',
  COMPARE: 'a direct comparison',
  APPLY: 'an application of the idea to that case',
  VERIFY_CLAIM: 'a check of that claim — say plainly whether it is right, and correct your earlier statement if it was wrong',
  REVISIT: 'a return to that earlier point',
  DEFINE: 'what that term or step means',
  NONE: 'a direct response to what they asked',
}

/**
 * The advisory prompt block. Prompt text only. It restates — never loosens —
 * the question-legality and length limits, and it adds no tag, no key, and
 * no instruction that the server reads back as evidence.
 */
export function buildLearnerIntentBlock(intent: LearnerIntent): string {
  const about = intent.target ? `"${intent.target}"` : 'what they just asked'
  const lines = [
    '\n\nLEARNER DIRECTION (interpreted from the learner\'s own words — advisory):',
    `- The learner's latest message is a ${intent.kind.replace('_', '-').toLowerCase()} about ${about}. They asked for ${ACTION_TEXT[intent.requestedAction]}.`,
    '- Give them THAT, first and in substance, this turn. Answering their explicit request IS this turn\'s teaching step and counts as this turn\'s new concept; do not defer it to "later", do not reduce it to one clause, and do not re-deliver your previous explanation in its place.',
    '- If you already gave this and they are asking again, your last answer did not land: give it more concretely, never a repeat.',
    '- Every other limit in the TURN DIRECTIVE still applies (question legality, question stage, length). Only ask a question if the TURN DIRECTIVE allows one this turn.',
  ]
  return lines.join('\n')
}

/** The request header that asks for Architecture B. Honoured only for accounts with `modelOverrideAllowed`. */
export const INTENT_EXPERIMENT_HEADER = 'x-exp-intent-interpreter'

export function intentExperimentRequested(headerValue: string | null): boolean {
  return headerValue === '1'
}

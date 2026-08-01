/**
 * P1-1 — Phase 1 Stage 1: AttemptVector capture, as a DECLARED self-report.
 *
 * WHY A DECLARATION AND NOT A DERIVATION. Phase 1 §11.2 settled this:
 *
 *   "Derivation is not possible. Axes 3 (representation), 4 (concreteness),
 *    5 (entry point) and 7 (agency) are not present in the existing decision
 *    record — they are properties of the pedagogical intent of a turn, and
 *    nothing today writes them down. A attemptVector(decisionRecord) that
 *    inferred them from action type and rendered text would be reconstructing
 *    intent from output, which is guessing."
 *
 * and required the opposite: the vector is "written by the kernel at decision
 * time — the only point where the intent is actually known." The component
 * that composes the turn is the only holder of that intent, so it declares
 * what it chose. Nothing here reads the rendered reply to work anything out.
 *
 * HONESTY CLASS: PROXY, never instrumentation.
 * Phase 1's data-availability table classifies `Response confidence` as PROXY
 * with the standing rule "Declare the proxy wherever used; never report as an
 * instrument", and `signals.ts` says of itself: "LLM self-report — a
 * substitute for real instrumentation, not equivalent to it." An AttemptVector
 * is self-report about the composer's OWN intent, which makes it authoritative
 * on what was intended and NO evidence at all about what was achieved.
 * ATTEMPT_VECTOR_HONESTY_CLASS below exists so no reader can forget that, and
 * TQ-5's gate G3 keeps its MEASURED semantic half for the same reason: a
 * declaration cannot certify its own non-paraphrase.
 *
 * NO NEW DECISION AUTHORITY. §14.2 Stage 1: "a persistence change … No
 * behaviour changes at all — nothing reads the vectors yet." Nothing gains the
 * power to choose differently; a choice already being made is written down.
 *
 * NO NEW CAPTURE PATH. The parsed vector rides WP-3's existing
 * `TurnFacts.attemptVector` into the single `emitTurn()` call. No second
 * writer, no new table, no new model.
 *
 * NO FABRICATION. Mirrors `signals.ts`'s rule that greetings and questions
 * produce no signal: an axis the composer cannot honestly state is OMITTED,
 * and an omitted axis reads as "not captured" (WP-3's contract), never as a
 * default. A malformed value is dropped rather than coerced.
 */
import type { AttemptVectorV2 } from '@/lib/evidence-spine/types'

/** Never `PRESENT`. Carried alongside the vector wherever honesty class is
 *  represented, per the standing rule on the confidence row. */
export const ATTEMPT_VECTOR_HONESTY_CLASS = 'PROXY' as const
export type AttemptVectorHonestyClass = typeof ATTEMPT_VECTOR_HONESTY_CLASS

const TAG_RE = /<!--\s*ATTEMPT\b([^>]*?)-->/i

// Closed value sets, transcribed from Phase 1 §7.4.1. A value outside its set
// is dropped: an unrecognised axis value is a mis-declaration, and accepting
// it would put a free-text string where TQ-4 expects a coordinate.
const CHANNEL = ['verbal', 'visual', 'enactive', 'symbolic', 'auditory'] as const
const REPRESENTATION = ['concrete-object', 'diagram', 'graph', 'table', 'algebraic', 'narrative', 'physical-apparatus'] as const
const CONCRETENESS = ['enactive', 'iconic', 'symbolic'] as const
const ENTRY_POINT = ['definition-first', 'example-first', 'problem-first', 'phenomenon-first', 'contrast-first'] as const
const GRANULARITY = ['whole', 'decomposed', 'atomic-step'] as const
const AGENCY = ['tutor-does', 'joint', 'learner-does'] as const

function pick<T extends readonly string[]>(set: T, raw: string | undefined): T[number] | undefined {
  if (!raw) return undefined
  const v = raw.trim().toLowerCase()
  return (set as readonly string[]).includes(v) ? (v as T[number]) : undefined
}

/**
 * The system-prompt instruction. Deliberately short and OPTIONAL per axis:
 * an axis the composer cannot state honestly must be omitted, because a
 * guessed axis is worse than an absent one — it would enter TQ-4's diff as if
 * it were a real coordinate.
 *
 * The tag is invisible to the learner: `parseAttemptVectorTag` strips it
 * before the reply is stored, captured or returned, exactly as the OBSERVATION
 * SIGNAL tag is.
 */
export function buildAttemptVectorInstruction(): string {
  return (
    '\n\nTEACHING INTENT (mandatory, invisible to the student): after your reply, ' +
    'append EXACTLY ONE tag on its own final line describing THIS turn\'s teaching ' +
    'choices — what you intended, not what you wrote. Format: ' +
    '<!--ATTEMPT channel="verbal|visual|enactive|symbolic|auditory" ' +
    'representation="concrete-object|diagram|graph|table|algebraic|narrative|physical-apparatus" ' +
    'concreteness="enactive|iconic|symbolic" ' +
    'entry="definition-first|example-first|problem-first|phenomenon-first|contrast-first" ' +
    'granularity="whole|decomposed|atomic-step" ' +
    'agency="tutor-does|joint|learner-does"--> ' +
    'OMIT any attribute you cannot state honestly — never guess one. ' +
    'Omit the whole tag if this turn made no teaching choice.'
  )
}

export interface AttemptVectorParse {
  vector: AttemptVectorV2 | null
  cleanText: string
}

/**
 * Extract and strip the tag. Total: never throws, and an absent or unusable
 * tag yields `vector: null` with the text returned unchanged apart from the
 * strip. A tag whose every attribute was dropped yields null rather than an
 * empty vector — "declared nothing" and "declared an empty intent" must not
 * look the same downstream.
 */
export function parseAttemptVectorTag(text: string): AttemptVectorParse {
  const m = text.match(TAG_RE)
  if (!m) return { vector: null, cleanText: text }

  const attrs = m[1] ?? ''
  const read = (key: string): string | undefined =>
    attrs.match(new RegExp(`${key}\\s*=\\s*"([^"]*)"`, 'i'))?.[1]

  const vector: AttemptVectorV2 = {}
  const channel = pick(CHANNEL, read('channel'))
  if (channel) vector.channel = channel
  const representation = pick(REPRESENTATION, read('representation'))
  if (representation) vector.representation = representation
  const concreteness = pick(CONCRETENESS, read('concreteness'))
  if (concreteness) vector.concreteness = concreteness
  const entryPoint = pick(ENTRY_POINT, read('entry'))
  if (entryPoint) vector.entryPoint = entryPoint
  const granularity = pick(GRANULARITY, read('granularity'))
  if (granularity) vector.granularity = granularity
  const agency = pick(AGENCY, read('agency'))
  if (agency) vector.agency = agency

  // Axis 2 (METHOD, M1…M17) and axis 8 (INSTANCE) are NOT declared here.
  // METHOD has no vocabulary until TQ-3's library exists, and INSTANCE is a
  // fact the runtime already holds — asking the composer to restate either
  // would invite invention where a real source exists or will exist.

  const cleanText = text.replace(TAG_RE, '').trimEnd()
  return { vector: Object.keys(vector).length > 0 ? vector : null, cleanText }
}

/** How many axes a declaration actually carried. Stage 1's own quality
 *  measure: a vector declaring one axis is not a vector declaring six, and
 *  the paraphrase baseline is only as good as its coverage. */
export function declaredAxisCount(vector: AttemptVectorV2 | null): number {
  return vector === null ? 0 : Object.keys(vector).length
}

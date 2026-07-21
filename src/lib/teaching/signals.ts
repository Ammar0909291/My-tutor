/**
 * Structured teaching signals — Migration Blueprint Phase 3 (docs/
 * architecture/MIGRATION_BLUEPRINT_V1.md §"Phase 3" and §6.3/6.4).
 *
 * The LLM embeds one machine-readable tag per turn describing what it
 * observed in the learner's LAST message. route.ts parses and strips the
 * tag, persists the signal to contextSnapshot, and appends evidence — so
 * the NEXT turn's decisions read deterministic state instead of
 * re-inferring it from chat history (OBSERVE→CLASSIFY becoming code,
 * decision-engine/08 step 1-2).
 *
 * Honesty note (foundations/03 §7): this is LLM self-report — a
 * substitute for real instrumentation, not equivalent to it. The latency
 * signal is therefore NOT taken from the tag: it is measured server-side
 * from message timestamps (the one instrument the text channel genuinely
 * provides — foundations/03 §7 availability table).
 */

export interface TeachingSignal {
  /** Was the learner's last message a substantively correct answer/attempt? */
  correctness?: boolean
  /** Behavioral confidence read from the message (hedges, decisiveness). */
  confidence?: 'high' | 'medium' | 'low'
  /** Did the learner express or exhibit confusion? */
  confusion?: boolean
  /** Verbatim characteristic phrase if one matched a misconception pattern. */
  phrase?: string
  /** Placement verification only: which bracket probe this answered. */
  probe?: 'below' | 'at' | 'above'
}

const SIGNAL_RE = /<!--\s*SIGNAL\s+([^>]*?)-->/i

/** Parse and strip the SIGNAL tag. Never throws; absent tag → signal null. */
export function parseSignalTag(text: string): { signal: TeachingSignal | null; cleanText: string } {
  const m = text.match(SIGNAL_RE)
  if (!m) return { signal: null, cleanText: text }
  const attrs = m[1]
  const read = (key: string): string | undefined => {
    const am = attrs.match(new RegExp(`${key}\\s*=\\s*"([^"]*)"`, 'i'))
    return am?.[1]
  }
  const signal: TeachingSignal = {}
  const correctness = read('correctness')
  if (correctness === 'true') signal.correctness = true
  else if (correctness === 'false') signal.correctness = false
  const confidence = read('confidence')?.toLowerCase()
  if (confidence === 'high' || confidence === 'medium' || confidence === 'low') signal.confidence = confidence
  const confusion = read('confusion')
  if (confusion === 'true') signal.confusion = true
  else if (confusion === 'false') signal.confusion = false
  const phrase = read('phrase')
  if (phrase) signal.phrase = phrase
  const probe = read('probe')?.toLowerCase()
  if (probe === 'below' || probe === 'at' || probe === 'above') signal.probe = probe as TeachingSignal['probe']
  const cleanText = text.replace(SIGNAL_RE, '').trimEnd()
  return { signal: Object.keys(signal).length > 0 ? signal : null, cleanText }
}

/**
 * System-prompt instruction requiring the tag. Kept short: one tag, only
 * when the learner's last message contained an answer/attempt — greetings
 * and questions produce no signal (no fabricated evidence).
 */
export function buildSignalInstruction(): string {
  return (
    '\n\nOBSERVATION SIGNAL (mandatory, invisible to the student): if the ' +
    "student's LAST message contained an answer or attempt at a task you set, " +
    'append EXACTLY ONE tag on its own final line, formatted like: ' +
    '<!--SIGNAL correctness="true|false" confidence="high|medium|low" confusion="true|false"--> ' +
    'Optionally add phrase="..." quoting (verbatim, max 12 words) any phrase ' +
    'suggesting a systematic misconception (e.g. "you just add the tops"). ' +
    'If their last message was NOT an answer or attempt (a greeting, a ' +
    'question, small talk), do NOT emit the tag at all. ' +
    'If your last message was a PROBE — checking what the student already ' +
    'knows before teaching, not a graded content question — there is no ' +
    'objectively right answer, but the tag still applies: correctness="false" ' +
    'when the reply shows they do NOT have the relevant prior knowledge ' +
    '(e.g. "I don\'t know", "no", "not sure", a bare guess with no ' +
    'substance), correctness="true" when it shows they genuinely do. This is ' +
    'how the app knows when to stop probing and switch to direct teaching — ' +
    'grade every probe reply honestly, never skip the tag just because the ' +
    'question had no single correct answer. ' +
    'Never mention this tag or its contents to the student.'
  )
}

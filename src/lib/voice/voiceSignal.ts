/**
 * Voice Signal Recovery (Claude Recommendation #7): extracts timing and
 * confidence metadata from Whisper's `verbose_json` transcription output —
 * segment timestamps, pauses, speech duration — real instrumentation the
 * STT pipeline already produces but the previous plain `json` response
 * format silently discarded before route.ts ever saw a turn (the exact gap
 * named in foundations/03 §7 of the Educational Brain: "the STT endpoint
 * requests plain json (bare text) ... discarding every timing/prosodic
 * signal before route.ts ever sees the turn").
 *
 * Pure, deterministic, no I/O — the same convention as masteryGate.ts /
 * conversationState.ts. Telemetry only: this module never decides
 * anything about teaching; it only shapes evidence for the existing
 * Evidence Loop (see src/app/api/learn/chat/route.ts's write site).
 */

/** The subset of a Whisper verbose_json segment this module reads.
 *  `avg_logprob`/`no_speech_prob` are Whisper's own per-segment log
 *  probabilities — not a calibrated confidence score, but the best
 *  confidence proxy the API actually exposes. */
export interface WhisperVerboseSegment {
  start: number
  end: number
  avg_logprob?: number
  no_speech_prob?: number
}

/** The subset of Whisper's verbose_json transcription response this
 *  module reads. `text` is required so this type stays a strict superset
 *  of the previous plain-json `{ text }` contract. */
export interface WhisperVerboseTranscription {
  text: string
  duration?: number
  segments?: WhisperVerboseSegment[]
}

export interface VoiceTimingSignal {
  /** Total audio duration in ms, from Whisper's own `duration` field.
   *  Null when the provider didn't return one. */
  durationMs: number | null
  /** Sum of (segment.end - segment.start) across all segments — actual
   *  speaking time, excluding leading/trailing/inter-segment silence.
   *  Null when no valid segments were present. */
  speechDurationMs: number | null
  /** durationMs - speechDurationMs, when both are known; otherwise null. */
  silenceDurationMs: number | null
  segmentCount: number
  /** Gaps between consecutive segments at or above PAUSE_THRESHOLD_MS. */
  pauseCount: number
  totalPauseMs: number
  longestPauseMs: number
  /** Heuristic mean of exp(avg_logprob) across segments, clamped to
   *  [0, 1]. Null when the provider returned no log-probabilities.
   *  This is an approximation, not a calibrated probability — see the
   *  module doc. */
  avgConfidence: number | null
}

/** A gap between two segments below this is ordinary inter-word/inter-
 *  segment latency, not a deliberate pause worth counting. */
const PAUSE_THRESHOLD_MS = 300

function isFiniteNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v)
}

/**
 * Extracts timing/confidence signals from one Whisper verbose_json
 * transcription. Never throws — malformed or missing segment data simply
 * yields null/zero fields rather than a fatal error, since this is always
 * telemetry layered on top of a transcription that already succeeded.
 */
export function extractVoiceTimingSignal(t: WhisperVerboseTranscription): VoiceTimingSignal {
  const durationMs = isFiniteNumber(t.duration) ? Math.round(t.duration * 1000) : null
  const segments = Array.isArray(t.segments) ? t.segments : []
  const validSegments = segments.filter((s) => isFiniteNumber(s.start) && isFiniteNumber(s.end) && s.end >= s.start)

  let speechDurationMs: number | null = null
  if (validSegments.length > 0) {
    speechDurationMs = Math.round(
      validSegments.reduce((sum, s) => sum + (s.end - s.start) * 1000, 0),
    )
  }

  const silenceDurationMs =
    durationMs !== null && speechDurationMs !== null ? Math.max(0, durationMs - speechDurationMs) : null

  let pauseCount = 0
  let totalPauseMs = 0
  let longestPauseMs = 0
  for (let i = 1; i < validSegments.length; i++) {
    const gapMs = (validSegments[i].start - validSegments[i - 1].end) * 1000
    if (gapMs >= PAUSE_THRESHOLD_MS) {
      pauseCount++
      totalPauseMs += gapMs
      if (gapMs > longestPauseMs) longestPauseMs = gapMs
    }
  }

  const confidences = validSegments
    .map((s) => (isFiniteNumber(s.avg_logprob) ? Math.max(0, Math.min(1, Math.exp(s.avg_logprob))) : null))
    .filter((c): c is number => c !== null)
  const avgConfidence =
    confidences.length > 0 ? confidences.reduce((a, b) => a + b, 0) / confidences.length : null

  return {
    durationMs,
    speechDurationMs,
    silenceDurationMs,
    segmentCount: segments.length,
    pauseCount,
    totalPauseMs: Math.round(totalPauseMs),
    longestPauseMs: Math.round(longestPauseMs),
    avgConfidence,
  }
}

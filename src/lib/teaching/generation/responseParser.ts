/**
 * Phase 3 — response parsing.
 *
 * Converts ONE raw model reply into a typed `TeachingGenerationResponse` and
 * validates it against the request that produced it.
 *
 * Pure, deterministic, no business logic: it reads what the model returned and
 * shapes it. It never teaches, never repairs meaning, and never invents a
 * field the model did not provide.
 *
 * Two accepted forms, in order:
 *   1. A JSON object matching the declared response schema (optionally inside
 *      a ```json fence).
 *   2. Plain prose — treated as `explanation` in full. This is the honest
 *      fallback: a model that ignored the schema still produced teaching text,
 *      and discarding it would lose the turn.
 */

import {
  validateTeachingGenerationResponse,
  type TeachingGenerationRequest,
  type TeachingGenerationResponse,
} from './teachingGenerationRequest'

export const ParseMode = {
  /** Parsed from a JSON object matching the schema. */
  STRUCTURED: 'STRUCTURED',
  /** No parseable JSON; the whole reply was taken as the explanation. */
  PROSE_FALLBACK: 'PROSE_FALLBACK',
} as const
export type ParseMode = (typeof ParseMode)[keyof typeof ParseMode]

export interface ParsedGeneration {
  response: TeachingGenerationResponse
  mode: ParseMode
  /** Structural problems found against the request. Empty means valid. */
  problems: readonly string[]
  valid: boolean
}

/** Extract a JSON object from a raw reply, tolerating a ```json fence or
 *  surrounding prose. Returns null when nothing parses. */
function extractJsonObject(raw: string): Record<string, unknown> | null {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidates = [fenced?.[1], raw].filter((c): c is string => typeof c === 'string')

  for (const candidate of candidates) {
    const text = candidate.trim()
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start === -1 || end <= start) continue
    try {
      const parsed: unknown = JSON.parse(text.slice(start, end + 1))
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>
      }
    } catch {
      // Not JSON — fall through to the next candidate.
    }
  }
  return null
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value : undefined
}

function asStringList(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined
  const out = value.filter((v): v is string => typeof v === 'string')
  return out.length > 0 ? out : undefined
}

function asBoolean(value: unknown): boolean | undefined {
  return typeof value === 'boolean' ? value : undefined
}

/**
 * Parse one model reply. Never throws — a malformed reply yields a response
 * plus the reasons it is invalid, so the caller can decide, and a turn is
 * never lost to a parse error.
 */
export function parseTeachingGenerationResponse(
  request: TeachingGenerationRequest,
  rawReply: string,
): ParsedGeneration {
  const raw = rawReply ?? ''
  const json = extractJsonObject(raw)

  let response: TeachingGenerationResponse
  let mode: ParseMode

  if (json) {
    mode = ParseMode.STRUCTURED
    const assessmentRaw = json.assessment
    const assessment = assessmentRaw && typeof assessmentRaw === 'object' && !Array.isArray(assessmentRaw)
      ? assessmentRaw as Record<string, unknown>
      : null
    const question = assessment ? asString(assessment.question) : undefined

    response = {
      requestId: asString(json.requestId) ?? request.requestId,
      content: asString(json.explanation) ?? asString(json.content) ?? '',
      visualReferenced: asBoolean(json.visualReference) ?? asBoolean(json.visualReferenced) ?? false,
      returnedToLesson: asBoolean(json.returnedToLesson) ?? false,
      ...(question ? {
        assessment: {
          question,
          ...(asStringList(assessment!.options) ? { options: asStringList(assessment!.options)! } : {}),
          ...(asString(assessment!.expectedAnswer) ? { expectedAnswer: asString(assessment!.expectedAnswer)! } : {}),
        },
      } : {}),
      ...(asStringList(json.disambiguationOffered)
        ? { disambiguationOffered: asStringList(json.disambiguationOffered)! }
        : {}),
    }
  } else {
    mode = ParseMode.PROSE_FALLBACK
    // The model ignored the schema. Keep its teaching text rather than lose
    // the turn; every schema-derived flag stays false because the model never
    // asserted it — inferring them here would be inventing content.
    response = {
      requestId: request.requestId,
      content: raw.trim(),
      visualReferenced: false,
      returnedToLesson: false,
    }
  }

  const problems = validateTeachingGenerationResponse(request, response)
  return { response, mode, problems, valid: problems.length === 0 }
}

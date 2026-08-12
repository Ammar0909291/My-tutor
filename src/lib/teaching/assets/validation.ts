/**
 * Reusable asset validation — the gate every candidate must clear before
 * capture is even attempted (task 5). Duplicate detection is deliberately
 * NOT re-implemented here: decideCaptureAction (versioning.ts), already
 * wired inside captureGeneratedExplanation/captureGeneratedProbe, is the
 * single source of truth for "is this a duplicate" — re-checking it here
 * with a second, disconnected implementation would risk the two silently
 * drifting apart. This module answers the questions that CAN be decided
 * without a database round trip: content quality/length, language support,
 * whether the concept id is real, and whether the requested kind is a
 * known one.
 */
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import type { ExplanationKind, ProbeKind, ProbeChoice } from './assetIdentity'

export type ValidationResult = { valid: true } | { valid: false; reason: string }

const MIN_EXPLANATION_LENGTH = 20
const MIN_PROBE_STEM_LENGTH = 8
// Teaching languages this app actually supports (src/lib/tts.ts TeachingLang).
const SUPPORTED_LANGUAGES = new Set(['en', 'ru', 'hi'])

const EXPLANATION_KINDS = new Set<ExplanationKind>([
  'definition', 'core_explanation', 'worked_example', 'hint_tier_1', 'hint_tier_2', 'hint_tier_3',
  'misconception_repair', 'prerequisite_recovery', 'real_world_example', 'story_based', 'memory_trick',
  'faq', 'summary', 'revision_notes', 'flashcard', 'exam_oriented', 'common_misconception_note',
])

const PROBE_KINDS = new Set<ProbeKind>([
  'mcq', 'true_false', 'short_answer', 'fill_blank', 'numeric', 'step_check', 'misconception_probe', 'checkpoint',
])

const PLACEHOLDER_PATTERN = /\b(TODO|FIXME|lorem ipsum|placeholder text|xxx+)\b/i

// ── REUSABILITY ─────────────────────────────────────────────────────────────
//
// WHAT THIS GATE MISSED, MEASURED IN PRODUCTION.
//
// Corpus audit, `phys.meas.dimensions`. Asset f22e5673-4b1f-473a-bec8-4fbb…
// served with `provider: memory`, `servingMode: exact_match`, confidence 75:
//
//   "Mohammad Suaib, wave interference happens when two water waves overlap
//    on a pond… Good question — now, back to Dimensional Analysis, let's
//    examine a physical formula…"
//
// It was served twice, in different sessions, byte-for-byte identical — which
// is how it was identified as a stored artefact rather than a hallucination.
//
// Everything above passed: real concept id, supported language, valid kind,
// long enough, no placeholder, not degenerate. The gate asked whether the text
// was WELL-FORMED and never whether it was REUSABLE. Two things make it not:
//
//   1. It opens by addressing a specific learner BY NAME. A shared asset is
//      served to other learners, so a captured name is a leak by construction —
//      the audit mandate's "never store verbatim learner identity data inside
//      shared teaching assets", violated by the capture path itself.
//   2. It is turn-scoped discourse — an answer to a question the learner asked
//      in THAT session, plus a steer back to the lesson. Replayed to anyone
//      else it is a non-sequitur, which is exactly how it read.
//
// DELIBERATELY NOT ATTEMPTED HERE: checking that the content is ON TOPIC. The
// offending asset's SECOND paragraph is genuinely about dimensional analysis,
// so a vocabulary-overlap test would have passed it, and a fuzzy semantic test
// would reject good assets. That remains open and is recorded rather than
// papered over with a check that only looks like one.

/**
 * Turn-scoped discourse: phrases that only make sense inside the conversation
 * that produced them. Narrow on purpose — this is a backstop against a
 * specific, measured failure mode, not a style filter.
 */
const SESSION_BOUND_PATTERN =
  /(\bgood question\b|\bgreat question\b|\bback to (?:our|the|your)\b|\bnow,? back to\b|\blet'?s (?:get |head |go )?back to\b|\bas (?:i|we) (?:mentioned|said|explained) (?:earlier|before|above)\b|\byou asked\b|\bto answer your question\b|\breturning to (?:our|the)\b)/i

/** A leading vocative: "Name, the rest of the sentence…". */
function opensByAddressingSomeone(content: string, learnerName?: string | null): boolean {
  const trimmed = content.trim()
  if (learnerName) {
    // The precise check: the learner's OWN name, anywhere. A real explanation
    // of a physics concept never needs it, so there is no false positive to
    // trade away.
    const raw = learnerName.trim()
    const escaped = raw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    if (escaped) {
      // Word boundaries only where the name actually has a word character to
      // bound. A name like "A.J. (Bob)" ends in ')', and `\b` after it never
      // matches before a comma — so the unconditional version silently let the
      // leak through. Caught by this module's own test.
      const lead = /^\w/.test(raw) ? '\\b' : ''
      const tail = /\w$/.test(raw) ? '\\b' : ''
      if (new RegExp(`${lead}${escaped}${tail}`, 'i').test(trimmed)) return true
    }
  }
  // NO SHAPE HEURISTIC. The first draft had one — a capitalised word followed
  // by a comma — and this module's own test caught what it costs:
  //
  //   "Speed, distance and time are all related by one simple equation."
  //
  // That is a legitimate explanation and it has the exact shape of a vocative.
  // Rejecting it would quietly starve the capture pipeline, which is the moat
  // this whole subsystem exists to build. A name cannot be told from a
  // capitalised common noun without knowing the name — so when the caller
  // cannot supply one, this check honestly does nothing rather than guessing.
  //
  // STATED LIMIT: a captured personal address from a caller that passes no
  // name is caught only if it ALSO carries turn-scoped discourse (as the
  // measured asset did). The one live capture path supplies the name.
  return false
}

/** Cheap, deterministic "is this obviously garbage" check — not a claim of
 * pedagogical quality, just a filter for empty/placeholder/degenerate text. */
function hasMinimumQuality(content: string): boolean {
  const trimmed = content.trim()
  if (trimmed.length === 0) return false
  if (PLACEHOLDER_PATTERN.test(trimmed)) return false
  // Degenerate repetition: a single word repeated through the whole string
  // (e.g. a model failure mode producing "the the the the...").
  const words = trimmed.split(/\s+/)
  if (words.length >= 6 && new Set(words.map((w) => w.toLowerCase())).size === 1) return false
  return true
}

export interface ValidateExplanationInput {
  conceptId: string
  language: string
  content: string
  familyKind: string
  /** The learner whose turn produced this text, when the caller knows it.
   *  Supplying it turns the name check from a heuristic into an exact one. */
  learnerName?: string | null
}

export function validateExplanationCandidate(input: ValidateExplanationInput): ValidationResult {
  if (!SUPPORTED_LANGUAGES.has(input.language)) {
    return { valid: false, reason: `unsupported language: ${input.language}` }
  }
  if (!getKGNode(input.conceptId)) {
    return { valid: false, reason: `unknown concept id: ${input.conceptId}` }
  }
  if (!EXPLANATION_KINDS.has(input.familyKind as ExplanationKind)) {
    return { valid: false, reason: `invalid explanation kind: ${input.familyKind}` }
  }
  if (input.content.trim().length < MIN_EXPLANATION_LENGTH) {
    return { valid: false, reason: `content shorter than minimum length (${MIN_EXPLANATION_LENGTH})` }
  }
  if (!hasMinimumQuality(input.content)) {
    return { valid: false, reason: 'content failed minimum quality check (empty, placeholder, or degenerate)' }
  }
  if (opensByAddressingSomeone(input.content, input.learnerName)) {
    return { valid: false, reason: 'content addresses a specific learner by name — not reusable, and a learner-identity leak into a shared asset' }
  }
  if (SESSION_BOUND_PATTERN.test(input.content)) {
    return { valid: false, reason: 'content is turn-scoped discourse (answers a question asked in that session, or steers back to the lesson) — not reusable' }
  }
  return { valid: true }
}

export interface ValidateProbeInput {
  conceptId: string
  language: string
  stem: string
  probeKind: string
  choices?: ProbeChoice[]
}

export function validateProbeCandidate(input: ValidateProbeInput): ValidationResult {
  if (!SUPPORTED_LANGUAGES.has(input.language)) {
    return { valid: false, reason: `unsupported language: ${input.language}` }
  }
  if (!getKGNode(input.conceptId)) {
    return { valid: false, reason: `unknown concept id: ${input.conceptId}` }
  }
  if (!PROBE_KINDS.has(input.probeKind as ProbeKind)) {
    return { valid: false, reason: `invalid probe kind: ${input.probeKind}` }
  }
  if (input.stem.trim().length < MIN_PROBE_STEM_LENGTH) {
    return { valid: false, reason: `stem shorter than minimum length (${MIN_PROBE_STEM_LENGTH})` }
  }
  if (!hasMinimumQuality(input.stem)) {
    return { valid: false, reason: 'stem failed minimum quality check (empty, placeholder, or degenerate)' }
  }
  if (input.probeKind === 'mcq' && (!input.choices || input.choices.length < 2)) {
    return { valid: false, reason: 'mcq requires at least 2 choices' }
  }
  if (input.probeKind === 'mcq' && input.choices && !input.choices.some((c) => c.isCorrect)) {
    return { valid: false, reason: 'mcq has no choice marked correct' }
  }
  return { valid: true }
}

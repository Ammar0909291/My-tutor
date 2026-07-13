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

/**
 * visualizationTieBreaker — Teaching Visualization Engine, PART 1.5.
 *
 * A narrow, confidence-gated semantic tie-breaker that sits BETWEEN Part 1 (the
 * deterministic decision layer, visualizationDecision.ts) and the future Part 2
 * generator. It does NOT re-decide from scratch — it confirms or overrides ONE
 * candidate VisualizationDecision that Part 1 was unsure about.
 *
 * Gated to fire ONLY when shouldVisualize === true AND confidence < CONFIDENCE_THRESHOLD
 * (0.65), derived from the Part 1 harness data: both in-scope known limitations
 * ("Roe versus Wade", "confidence increases" on feelings) score exactly 0.61, in the
 * same low band as legitimately-weak-but-correct single-signal matches (0.57, 0.59);
 * every decision scoring 0.70+ in the 20-case harness was correct. So 0.65 catches the
 * low band (re-confirming weak-but-correct cases is cheap and harmless) without
 * touching the reliable 0.70+ band.
 *
 * Explicitly OUT OF SCOPE: the "references an already-shown visual" limitation
 * (confidence 0.82 — a strong, correct-looking regex match) is a session-state
 * problem, not a confidence-resolvable semantic ambiguity. No amount of re-asking
 * the model about this isolated text can answer it; it must be handled by passing
 * session context in at Part 2 wiring time, not here.
 *
 * Uses the EXISTING Groq/Yandex AI plumbing (generateJSON from lib/ai/client.ts) —
 * no new provider, no new client. Not wired into any production lesson path.
 */

import { generateJSON } from '@/lib/ai/client'
import type { VisualizationDecision, VisualCategory } from './visualizationDecision'

/** Below this confidence (and only when shouldVisualize=true), Part 1.5 is invoked. */
export const CONFIDENCE_THRESHOLD = 0.65

const VALID_CATEGORIES: VisualCategory[] = ['diagram', 'simulation', 'process', 'comparison', 'plot', 'none']

export interface TieBreakResult {
  /** 'confirm' = Part 1 was right; 'override' = Part 1 was fooled by the matched phrase. */
  resolution: 'confirm' | 'override'
  /** Final, authoritative answer after tie-breaking. */
  shouldVisualize: boolean
  category: VisualCategory
  /** One-line model justification — for logging/debugging, never shown to the student. */
  rationale: string
}

function buildPrompt(explanationText: string, matchedPhrase: string, candidateCategory: VisualCategory): string {
  return `A keyword-matching system flagged the phrase "${matchedPhrase}" in this text as a possible signal for "${candidateCategory}" (a teaching visual category). Decide if it's being used in its LITERAL sense (a real comparison/contrast, a real quantitative relationship, etc. — something a diagram would help teach) or only INCIDENTALLY (e.g. part of a proper noun/name, an idiom, conversational filler, or about something abstract/emotional rather than concrete/quantitative).

Text: "${explanationText}"
Flagged phrase: "${matchedPhrase}"
Candidate category: ${candidateCategory}

Reply with ONLY this JSON, no other text:
{"isLiteral": true|false, "category": "diagram"|"simulation"|"process"|"comparison"|"plot"|"none"}`
}

/**
 * Resolve a low-confidence Part 1 candidate. Only call this when
 * candidate.shouldVisualize === true && candidate.confidence < CONFIDENCE_THRESHOLD.
 * On any AI failure (matches generateJSON's never-throws contract), degrades to
 * 'confirm' — i.e. trusts Part 1's original answer rather than blocking the turn.
 */
export async function resolveAmbiguousDecision(
  explanationText: string,
  candidate: VisualizationDecision,
): Promise<TieBreakResult> {
  const matchedPhrase = candidate.matchedText ?? candidate.category
  const prompt = buildPrompt(explanationText, matchedPhrase, candidate.category)

  const raw = await generateJSON(prompt, 150).catch(() => null)

  if (!raw || typeof raw.isLiteral !== 'boolean' || !VALID_CATEGORIES.includes(raw.category)) {
    return {
      resolution: 'confirm',
      shouldVisualize: candidate.shouldVisualize,
      category: candidate.category,
      rationale: 'tie-breaker call failed or returned malformed JSON — defaulted to confirming Part 1',
    }
  }

  if (raw.isLiteral) {
    return {
      resolution: 'confirm',
      shouldVisualize: true,
      category: raw.category === 'none' ? candidate.category : raw.category,
      rationale: `model confirmed literal usage of "${matchedPhrase}"`,
    }
  }

  return {
    resolution: 'override',
    shouldVisualize: false,
    category: 'none',
    rationale: `model judged "${matchedPhrase}" incidental, not literal — overriding to none`,
  }
}

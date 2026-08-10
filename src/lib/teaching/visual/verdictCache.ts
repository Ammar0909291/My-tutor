/**
 * THE VERDICT CACHE — why a topic costs two model calls once and none after.
 *
 * ── THE PROBLEM IT SOLVES ───────────────────────────────────────────────────
 * The figure was cached; the JUDGEMENT of it was not. So the second learner on
 * a topic skipped generation and then paid for the critic again, and so did the
 * third, and the hundredth. Per learner, per turn, forever. That is the real
 * cost of running this engine across thousands of topics, and it is entirely
 * avoidable: the same figure judged against the same text gives the same
 * answer, so asking again buys nothing.
 *
 * ── WHY THIS IS NOT A PROMOTION ─────────────────────────────────────────────
 * The obvious fix is to write a passing figure to ACTIVE and let the approved
 * tier serve it. That is wrong, and it is wrong for a reason worth stating: it
 * converts one model's opinion into the platform's authored content, silently,
 * at scale. ACTIVE means a human decided this is ours.
 *
 * A cached verdict claims something much smaller and true: THIS figure passed
 * THESE checks against THIS text on THIS date. It makes serving cheap without
 * making anything permanent, and it leaves the review lifecycle exactly where
 * it was — the only route to ACTIVE.
 *
 * ── A VERDICT IS ONLY VALID WHILE ITS GROUNDING IS ──────────────────────────
 * It is stored with a hash of the topic's title and description. Edit the
 * curriculum text and the hash moves, the cached verdict no longer describes
 * any comparison that exists, and the figure is re-judged. Silent staleness
 * here would mean serving a figure that was validated against text nobody can
 * read any more.
 *
 * ── ONLY A PASS IS WORTH CACHING ────────────────────────────────────────────
 * A HOLD is frequently about the moment, not the figure — a judge that timed
 * out or could not be reached. Caching that would turn a transient outage into
 * a permanent refusal for a topic. Failures are recorded in the outcome table
 * for diagnosis and are not cached as decisions.
 *
 * Storage reuses `visualization_cache` under its own key prefix. No schema
 * change, and the figure rows already written stay valid.
 */

import { getCachedVisualization, saveVisualization, type VisualizationCacheClient } from '@/lib/teaching/visuals/visualizationCache'
import { groundingHash } from './topicIdentity'
import type { ArchetypeContext } from './archetypes'
import type { CriticReport } from './figureCritic'

const VERDICT_PREFIX = 'scene:v1:verdict:'

/** How long a pass stands before the figure is judged afresh. */
export const VERDICT_TTL_MS = 90 * 24 * 60 * 60 * 1000

export interface CachedVerdict {
  decision: 'promote'
  confidence: number
  /** Fingerprint of the title+description the figure was judged against. */
  grounding: string
  /** Hash of the figure itself, so a regenerated variant is not covered. */
  figure: string
  judgedAt: number
}

export function verdictKey(conceptId: string): string {
  return `${VERDICT_PREFIX}${conceptId}`
}

/** Cheap, stable fingerprint of a figure payload. Shape, not content quality. */
export function figureFingerprint(payload: unknown): string {
  const text = JSON.stringify(payload) ?? ''
  let hash = 0
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) | 0
  return `f${(hash >>> 0).toString(16)}`
}

/**
 * The stored pass for this topic, if one still applies.
 *
 * Returns null — meaning "judge it" — whenever anything about the situation has
 * moved: different grounding text, a different figure, an expired verdict, or a
 * cache that cannot be read. Every one of those resolves toward doing the work
 * again rather than assuming the old answer holds.
 */
export async function readVerdict(
  ctx: ArchetypeContext,
  figurePayload: unknown,
  client?: VisualizationCacheClient,
  now: number = Date.now(),
): Promise<CachedVerdict | null> {
  try {
    const row = await getCachedVisualization(verdictKey(ctx.conceptId), client)
    if (!row?.code) return null
    const parsed = JSON.parse(row.code) as CachedVerdict
    if (parsed?.decision !== 'promote') return null
    if (parsed.grounding !== groundingHash(ctx)) return null
    if (parsed.figure !== figureFingerprint(figurePayload)) return null
    if (now - parsed.judgedAt > VERDICT_TTL_MS) return null
    return parsed
  } catch {
    return null
  }
}

/**
 * Store a pass. Anything else is deliberately not stored — see the header.
 * Best-effort: failing to cache costs the next learner a judge call, and must
 * never cost this one their turn.
 */
export async function writeVerdict(
  ctx: ArchetypeContext,
  figurePayload: unknown,
  report: CriticReport,
  client?: VisualizationCacheClient,
  now: number = Date.now(),
): Promise<void> {
  if (report.decision !== 'promote') return
  const verdict: CachedVerdict = {
    decision: 'promote',
    confidence: report.confidence,
    grounding: groundingHash(ctx),
    figure: figureFingerprint(figurePayload),
    judgedAt: now,
  }
  try {
    await saveVisualization(verdictKey(ctx.conceptId), JSON.stringify(verdict), client)
  } catch { /* best-effort by design */ }
}

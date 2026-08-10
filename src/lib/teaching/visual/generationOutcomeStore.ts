/**
 * WHERE GENERATION OUTCOMES ACTUALLY GO.
 *
 * `generationOutcome.ts` defines WHAT an attempt was; this is the one place
 * that writes it down. It is the production implementation of
 * `GenerationOutcomeSink`, and until it existed the engine's own audit trail
 * was an interface with no implementor — every acceptance and every rejection
 * in production would have been forgotten the moment the request ended.
 *
 * ── TWO WRITES, FOR TWO DIFFERENT QUESTIONS ─────────────────────────────────
 * ALWAYS  a VisualGenerationOutcome row.   "what did the engine decide, and why"
 * ON ACCEPT  an AssetIdentity + VisualAsset pair.  "what did it produce"
 *
 * They are separate because a rejection has no asset — there is no content, no
 * content hash, no canonical slug that means anything — and forcing one into
 * AssetIdentity would have meant either inventing a fake asset or discarding
 * the rejection. Discarding it is what made the 7-of-7 false-reject finding
 * invisible for as long as it was.
 *
 * ── THE ASSET IS ALWAYS WRITTEN AS DRAFT ────────────────────────────────────
 * Never ACTIVE, never on any code path, regardless of policy. Under 'auto' the
 * learner saw the figure this turn because `resolveVisualForTurn` served it —
 * that is a serving decision made by the allowlist, and it is recorded here as
 * `served`. Promotion to ACTIVE stays a human act through the existing admin
 * review endpoint, exactly as it is for explanations. A writer that could
 * promote its own output would make the review queue decorative.
 *
 * ── IT MUST NEVER COST A LESSON ─────────────────────────────────────────────
 * Every failure is swallowed and logged. `recordGenerationOutcome` wraps this
 * in a second try/catch for the same reason. An audit row is never worth a
 * failed turn, so the worst case here is a missing row, and a missing row can
 * only ever understate what the engine did — never change it.
 */

import { prisma } from '@/lib/db/prisma'
import { AssetFamily, AssetStatus, AuthorKind, GradeBand, Prisma, VisualRenderer } from '@prisma/client'
import type { VisualKind } from '@/lib/teaching/assets/assetIdentity'
import { hashContent } from '@/lib/teaching/assets/similarity'
import type { GenerationOutcome, GenerationOutcomeSink } from './generationOutcome'
import type { GeneratedFigure } from './visualEngine'

const FAMILY_KIND: VisualKind = 'concept_figure'

/**
 * The engine has no learner in scope — it generates a figure OF A CONCEPT, not
 * for one reader — so the asset is banded once and honestly rather than being
 * attributed to whoever happened to trigger it. ADULT is the widest band the
 * matcher will fall back FROM, so this understates fit rather than overstating
 * it: a mis-banded asset can be re-banded by a reviewer, a falsely narrow one
 * silently stops matching.
 */
const DEFAULT_GRADE_BAND = GradeBand.ADULT
const DEFAULT_LANGUAGE = 'en'

/** 'scene' | 'spec' — the form the model chose, recorded as-is. */
export function rendererOf(figure: GeneratedFigure | undefined): {
  label: string | null
  prisma: VisualRenderer | null
} {
  if (!figure) return { label: null, prisma: null }
  return figure.kind === 'scene'
    ? { label: 'scene', prisma: VisualRenderer.SCENE_SPEC }
    : { label: 'spec', prisma: VisualRenderer.VISUAL_SPEC }
}

/**
 * A11y text is MANDATORY on VisualAsset and an empty one fails validation, so
 * it is derived rather than left to the model: the narrations the scene already
 * carries, or the spec's own title, and the concept's name when a form carries
 * neither. Coarse on purpose — it names what the figure IS, and never asserts
 * anything about contents that were not checked.
 */
export function describeFigure(figure: GeneratedFigure, conceptTitle: string): string {
  if (figure.kind === 'scene') {
    const narration = figure.scene.steps
      .map((s) => s.narration?.trim())
      .filter((s): s is string => Boolean(s))
      .join(' ')
    if (narration) return narration
    if (figure.scene.title?.trim()) return `Figure: ${figure.scene.title.trim()}`
  } else {
    const title = typeof figure.spec.title === 'string' ? figure.spec.title.trim() : ''
    if (title) return `Figure: ${title}`
    return `A ${String(figure.spec.type).replace(/_/g, ' ')} of ${conceptTitle}.`
  }
  return `A figure of ${conceptTitle}.`
}

/**
 * Write the asset for an accepted figure, DRAFT, deduplicated.
 *
 * The dedup is by content hash within the concept's lineage. Generation is
 * cached, so the same figure legitimately arrives many times — once per learner
 * who reaches the concept — and without this the review queue would fill with
 * hundreds of identical rows. That is not hypothetical: the live-capture path
 * for explanations, which has no dedup, reached 73 copies of one concept in
 * production.
 *
 * Returns the assetId when a row was written, null when it was a duplicate or
 * the write failed.
 */
async function writeVisualAsset(
  outcome: GenerationOutcome,
  figure: GeneratedFigure,
): Promise<string | null> {
  const canonicalSlug = `${outcome.conceptId}:${FAMILY_KIND}:${DEFAULT_LANGUAGE}`
  const payload = figure.kind === 'scene' ? figure.scene : figure.spec
  const serialized = JSON.stringify(payload)
  const contentHash = hashContent(serialized)

  const duplicate = await prisma.assetIdentity.findFirst({
    where: { canonicalSlug, family: AssetFamily.VISUAL, contentHash },
    select: { assetId: true },
  })
  if (duplicate) return null

  const latest = await prisma.assetIdentity.findFirst({
    where: { canonicalSlug, family: AssetFamily.VISUAL },
    orderBy: { version: 'desc' },
    select: { assetId: true, version: true },
  })

  const created = await prisma.assetIdentity.create({
    data: {
      family: AssetFamily.VISUAL,
      familyKind: FAMILY_KIND,
      conceptId: outcome.conceptId,
      language: DEFAULT_LANGUAGE,
      gradeBand: DEFAULT_GRADE_BAND,
      authorId: 'SYSTEM_AI',
      authorKind: AuthorKind.AI_AUTHORED,
      // Never ACTIVE from a writer. See this file's header.
      status: AssetStatus.DRAFT,
      version: latest ? latest.version + 1 : 1,
      parentVersionId: latest?.assetId,
      canonicalSlug,
      contentHash,
      tags: ['visual-engine', figure.kind],
      intellectualProperty: 'proprietary',
      curriculumMappings: [],
      incompatibilities: [],
      prerequisites: [],
      visualAsset: {
        create: {
          renderer: rendererOf(figure).prisma ?? VisualRenderer.SCENE_SPEC,
          specPayload: payload as object,
          a11yDescription: describeFigure(figure, outcome.conceptTitle),
        },
      },
    },
    select: { assetId: true },
  })
  return created.assetId
}

/**
 * The production sink.
 *
 * Wired at the one call site that has a request in scope; everything else —
 * tests, the warm pass, any environment with no database — passes no sink and
 * the engine behaves exactly as it did before this file existed.
 */
export const prismaGenerationOutcomeSink: GenerationOutcomeSink = {
  async record(outcome: GenerationOutcome): Promise<void> {
    let assetId: string | null = null
    const figure = outcome.result.ok ? outcome.result.figure : undefined

    // The asset write is attempted first but is NOT allowed to take the audit
    // row down with it: the row is the thing that must survive, because it is
    // the only record that the attempt happened at all.
    if (outcome.result.ok && figure) {
      try {
        assetId = await writeVisualAsset(outcome, figure)
      } catch (err) {
        console.warn('[visual-outcome] asset write failed:', err)
      }
    }

    try {
      await prisma.visualGenerationOutcome.create({
        data: {
          conceptId: outcome.conceptId,
          conceptTitle: outcome.conceptTitle,
          policy: outcome.policy,
          accepted: outcome.result.ok,
          served: outcome.result.ok ? outcome.result.served : false,
          reason: outcome.result.ok ? null : outcome.result.reason,
          cached: outcome.cached,
          model: outcome.model ?? null,
          elapsedMs: outcome.elapsedMs,
          renderer: rendererOf(figure).label,
          // Accepted: the figure. Rejected: what was rejected, verbatim — which
          // is the only way to tell a weak generator from an over-strict rule.
          payload: ((outcome.result.ok
            ? (figure ? (figure.kind === 'scene' ? figure.scene : figure.spec) : undefined)
            : outcome.result.payload) ?? Prisma.DbNull) as Prisma.InputJsonValue,
          assetId,
        },
      })
    } catch (err) {
      console.warn('[visual-outcome] outcome write failed:', err)
    }
  },
}

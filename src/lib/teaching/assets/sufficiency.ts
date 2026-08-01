/**
 * WP-6 / handoff EH-2 — the sufficiency vector as a per-concept READ MODEL.
 *
 * Phase 4 §5 (EA-2): coverage is a per-CONSUMER vector, not a scalar. A
 * concept reading 100% by the live metric can be uncovered for three of the
 * four consumers, because `coveragePercent` counts a concept as covered when
 * it has ANY authored asset (contentQualityDashboard.ts's `authoredCoverage`
 * = `assetCount > 0`, over ACTIVE EXPLANATION assets only).
 *
 * THREE BINDING CONSTRAINTS, taken from Phase 4 §5 and implemented literally:
 *
 *   1. `coveragePercent` IS UNCHANGED. This module does not compute it, does
 *      not re-derive it, and does not export a replacement. It is
 *      reinterpreted — read as "the explanation component of the vector" —
 *      not replaced. Nothing in contentQualityDashboard.ts's summarizeSubject()
 *      is touched by this file.
 *
 *   2. `teaching` IS DELEGATED TO EBC AND MUST NOT BE REDEFINED. Phase 4 §5
 *      derives it from EBC's E0501/E0502/E0503, and CEKR §11 delegates
 *      shippability to the compiler. Those codes are build-time and appear
 *      nowhere in `src/` — so this module reports `teaching` as DELEGATED,
 *      never a locally computed number. Where EA-2 and an E-code disagree,
 *      the E-code wins; the only way to honour that here is to not compute a
 *      rival value.
 *
 *   3. AssetIdentity IS EXTENDED BY REFERENCE. This module reads asset counts
 *      per family through one grouped query and stores nothing. No new table,
 *      no cached copy, no second coverage state — the vector is derived on
 *      read, so it cannot drift from the catalogue.
 *
 * Read-only, like the module it sits beside: it has no writer and no caller in
 * the serving path, and changing what it reports can never change what a
 * student is served.
 */
import { prisma } from '@/lib/db/prisma'
import { AssetFamily, AssetStatus } from '@prisma/client'
import { subjectConceptIds } from './contentQualityDashboard'

/** A component is either a measured count or an honest declaration that this
 *  layer is not the one entitled to measure it. */
export type ComponentState = 'MEASURED' | 'DELEGATED' | 'NOT_MEASURABLE'

export interface SufficiencyComponent {
  state: ComponentState
  /** ACTIVE assets backing this component. Present only when MEASURED. */
  assetCount?: number
  sufficient?: boolean
  /** Who owns the answer, when this layer does not. */
  detail: string
}

/**
 * One concept's coverage, per consumer.
 *
 * Phase 4 §5 bounds each component explicitly, and those bounds are the
 * comments below — they are not this module's invention and must not be
 * widened here.
 */
export interface SufficiencyVector {
  conceptId: string
  subject: string
  /** EBC-owned (E0501/E0502/E0503). Always DELEGATED here — see constraint 2. */
  teaching: SufficiencyComponent
  /** Bounded to the runtime depth-versus-need reading, because EBC already
   *  owns ladder validity and completeness (E0506, E0507, §7.6's E0401/E0402,
   *  §6.4's E0332). Not measurable until hint ladders exist in the runtime. */
  adaptive: SufficiencyComponent
  /** EA-2's only wholly new component. Measured from ACTIVE VISUAL assets. */
  visual: SufficiencyComponent
  /** The component `coveragePercent` already reports, restated per concept so
   *  the reinterpretation is visible rather than implied. Same source, same
   *  definition, no second derivation. */
  explanation: SufficiencyComponent
}

const EBC_DELEGATED =
  'Owned by EBC E0501/E0502/E0503 (build-time), delegated by CEKR §11. Not computed here — ' +
  'where EA-2 and an E-code disagree, the E-code wins, so no rival value is produced.'

const ADAPTIVE_UNMEASURABLE =
  'Bounded to the runtime depth-versus-need reading. No hint ladder or scaffold depth exists ' +
  'in the runtime to read, and ladder validity/completeness is EBC-owned (E0506/E0507/E0401/E0402/E0332).'

/**
 * Per-concept sufficiency vectors for one subject.
 *
 * One grouped query over AssetIdentity, by concept and family — the same
 * read-only surface `contentQualityDashboard.ts` already uses, extended by
 * reference rather than copied. Every KG concept appears, including concepts
 * with no assets at all, because an absent concept is exactly the case the
 * scalar metric hides.
 */
export async function getSubjectSufficiency(subjectSlug: string): Promise<SufficiencyVector[]> {
  const conceptIds = subjectConceptIds(subjectSlug)
  if (conceptIds.length === 0) return []

  const rows = await prisma.assetIdentity.groupBy({
    by: ['conceptId', 'family'],
    where: { status: AssetStatus.ACTIVE, conceptId: { in: conceptIds } },
    _count: { conceptId: true },
  })

  const counts = new Map<string, Map<AssetFamily, number>>()
  for (const r of rows) {
    const byFamily = counts.get(r.conceptId) ?? new Map<AssetFamily, number>()
    byFamily.set(r.family, r._count.conceptId)
    counts.set(r.conceptId, byFamily)
  }

  return conceptIds.map((conceptId) => {
    const byFamily = counts.get(conceptId)
    const explanations = byFamily?.get(AssetFamily.EXPLANATION) ?? 0
    const visuals = byFamily?.get(AssetFamily.VISUAL) ?? 0

    return {
      conceptId,
      subject: subjectSlug,
      teaching: { state: 'DELEGATED', detail: EBC_DELEGATED },
      adaptive: { state: 'NOT_MEASURABLE', detail: ADAPTIVE_UNMEASURABLE },
      visual: {
        state: 'MEASURED', assetCount: visuals, sufficient: visuals > 0,
        detail: 'ACTIVE VISUAL assets for this concept.',
      },
      explanation: {
        state: 'MEASURED', assetCount: explanations, sufficient: explanations > 0,
        detail: 'ACTIVE EXPLANATION assets — the same source `coveragePercent` already counts, restated per concept.',
      },
    }
  })
}

export interface SufficiencySummary {
  subject: string
  concepts: number
  /** Concepts with ≥1 ACTIVE EXPLANATION asset. This is the numerator
   *  `coveragePercent` already uses; it is reported here to make the
   *  reinterpretation checkable, NOT to replace that metric. */
  explanationCovered: number
  /** EA-2's new signal: how many concepts have any visual at all. */
  visualCovered: number
  /** Concepts the scalar metric calls covered but that have no visual — the
   *  population Phase 4 §5 exists to make visible. */
  coveredButNoVisual: number
  teaching: ComponentState
  adaptive: ComponentState
}

/** Summarize by counting the per-concept vectors — never a second aggregation
 *  query, so the summary and the rows can never disagree. */
export function summarizeSufficiency(subject: string, vectors: readonly SufficiencyVector[]): SufficiencySummary {
  const explanationCovered = vectors.filter((v) => v.explanation.sufficient === true).length
  const visualCovered = vectors.filter((v) => v.visual.sufficient === true).length
  const coveredButNoVisual = vectors.filter(
    (v) => v.explanation.sufficient === true && v.visual.sufficient !== true,
  ).length

  return {
    subject,
    concepts: vectors.length,
    explanationCovered,
    visualCovered,
    coveredButNoVisual,
    teaching: 'DELEGATED',
    adaptive: 'NOT_MEASURABLE',
  }
}

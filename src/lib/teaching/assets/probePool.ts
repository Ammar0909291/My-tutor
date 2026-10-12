/**
 * How many ACTIVE authored cards with three or more options a concept holds.
 *
 * Owner decision 2026-10-07 (CHEM-004 / BIO-019): a 2-option card is practice
 * only — but only where the concept can still reach verified mastery without
 * it (turnContract.certifiesMastery). Read only when a 2-option card has just
 * been graded, scoped to one concept and one language: at most a few dozen
 * rows of `choices`, never an aggregate over the table (egress rule,
 * docs/history/egress-incidents.md). Null on any failure — the caller then
 * keeps the old rule rather than guessing.
 */
import { prisma } from '@/lib/db/prisma'
import { AssetFamily, AssetStatus } from '@prisma/client'

export async function countThreePlusOptionProbes(conceptId: string, language: string): Promise<number | null> {
  try {
    const rows = await prisma.assetIdentity.findMany({
      where: { family: AssetFamily.PROBE, conceptId, language, status: AssetStatus.ACTIVE },
      select: { probeAsset: { select: { choices: true } } },
      take: 60,
    })
    return rows.filter((r) => Array.isArray(r.probeAsset?.choices) && (r.probeAsset!.choices as unknown[]).length >= 3).length
  } catch (err) {
    console.warn('[probePool] count failed:', err)
    return null
  }
}

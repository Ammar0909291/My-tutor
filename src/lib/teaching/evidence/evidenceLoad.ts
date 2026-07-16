/**
 * Evidence loaders — the ONLY impure file in the evidence read path.
 * Fetches the existing evidence surfaces (no new telemetry) and provides the
 * brain/packages-backed PackageInspector / PackageIndex implementations.
 * Everything downstream (reader, analytics, feedback) is pure.
 */
import fs from 'fs'
import path from 'path'
import { prisma } from '@/lib/db/prisma'
import type { EvidenceCorpus, PackageIndex } from './evidenceReader'
import type { PackageInspector } from './authoringFeedback'

const PACKAGE_DIR = path.join(process.cwd(), 'brain', 'packages')

interface PackageArtifactSlice {
  manifest: { packageId: string; contentHash: string }
  assets: Array<{ kind: string }>
}

const packageCache = new Map<string, PackageArtifactSlice | null>()

function readPackageArtifact(conceptId: string): PackageArtifactSlice | null {
  if (packageCache.has(conceptId)) return packageCache.get(conceptId)!
  let slice: PackageArtifactSlice | null = null
  try {
    const p = path.join(PACKAGE_DIR, `${conceptId}.package.json`)
    if (fs.existsSync(p)) {
      const raw = JSON.parse(fs.readFileSync(p, 'utf-8')) as PackageArtifactSlice
      if (raw?.manifest?.packageId && raw?.manifest?.contentHash && Array.isArray(raw.assets)) {
        slice = raw
      }
    }
  } catch {
    slice = null // unreadable artifact never breaks analytics
  }
  packageCache.set(conceptId, slice)
  return slice
}

/** brain/packages-backed PackageIndex for the Evidence Reader. */
export const artifactPackageIndex: PackageIndex = (conceptId) => {
  const slice = readPackageArtifact(conceptId)
  return slice ? { packageId: slice.manifest.packageId, contentHash: slice.manifest.contentHash } : null
}

/** brain/packages-backed PackageInspector for the feedback layers. */
export const artifactPackageInspector: PackageInspector = (conceptId) => {
  const slice = readPackageArtifact(conceptId)
  if (!slice) return null
  return {
    packageId: slice.manifest.packageId,
    contentHash: slice.manifest.contentHash,
    assetKinds: new Set(slice.assets.map((a) => a.kind)),
  }
}

export function clearEvidencePackageCache(): void {
  packageCache.clear()
}

export interface LoadEvidenceOptions {
  /** restrict to events at/after this time */
  since?: Date
  /** restrict to one learner */
  userId?: string
  /** hard cap on evidence events read (newest first, then re-sorted) */
  maxEvents?: number
}

/** Loads the full evidence corpus from the existing tables. Read-only. */
export async function loadEvidenceCorpus(opts: LoadEvidenceOptions = {}): Promise<EvidenceCorpus> {
  const eventWhere = {
    ...(opts.since ? { occurredAt: { gte: opts.since } } : {}),
    ...(opts.userId ? { userId: opts.userId } : {}),
  }
  const events = await prisma.evidenceEvent.findMany({
    where: eventWhere,
    orderBy: { occurredAt: 'desc' },
    take: opts.maxEvents ?? 50_000,
    select: {
      eventId: true, occurredAt: true, userId: true, sessionId: true, turnId: true,
      conceptId: true, language: true, category: true, misconceptionId: true,
      outcome: true, strength: true, rawScore: true,
    },
  })

  const userIds = [...new Set(events.map((e) => e.userId))]
  const sessionIds = [...new Set(events.map((e) => e.sessionId).filter((s): s is string => s !== null))]
  const conceptIds = [...new Set(events.map((e) => e.conceptId))]

  const [strategyEvents, topicProgress, mistakes] = await Promise.all([
    sessionIds.length > 0
      ? prisma.teachingStrategyEvent.findMany({
          where: { sessionId: { in: sessionIds } },
          select: { userId: true, topicSlug: true, strategy: true, sessionId: true, createdAt: true },
        })
      : Promise.resolve([]),
    userIds.length > 0
      ? prisma.topicProgress.findMany({
          where: { userId: { in: userIds }, topicSlug: { in: conceptIds } },
          select: {
            userId: true, subjectSlug: true, topicSlug: true, status: true, masteryPct: true,
            attempts: true, revisionCount: true, createdAt: true, completedAt: true, updatedAt: true,
          },
        })
      : Promise.resolve([]),
    userIds.length > 0
      ? prisma.mistakeRecord.findMany({
          where: { userId: { in: userIds }, topicSlug: { in: conceptIds } },
          select: { userId: true, subjectSlug: true, topicSlug: true, category: true, createdAt: true },
        })
      : Promise.resolve([]),
  ])

  return {
    events,
    strategyEvents,
    topicProgress,
    mistakes,
    packageIndex: artifactPackageIndex,
  }
}

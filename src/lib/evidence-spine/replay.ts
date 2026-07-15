/**
 * EOS M1 — Evidence Spine: replay.
 *
 * Replay = load a learner's committed events (seq-ascending) and fold them
 * into projections (RS L4: state that cannot be re-derived from evidence
 * does not exist; RS T-4: same log prefix → identical projections).
 *
 * M1 scope: rebuild + verify. Decision DIFFING against candidate policies
 * arrives with later milestones — this module deliberately stops at "the
 * log is foldable, the fold is deterministic, snapshots equal re-folds".
 */
import { foldAll, foldEvents, initialStudentView, type StudentViewProjection } from './fold'
import type { SpineEventRecord, SpineSource } from './types'

type PrismaLike = {
  spineEvent: {
    findMany(args: {
      where: { learnerId: string; seq?: { gt: number } }
      orderBy: { seq: 'asc' }
      take?: number
    }): Promise<Array<{
      eventId: string; seq: number; learnerId: string; sessionId: string | null
      turnId: string | null; type: string; schemaVersion: number
      payload: unknown; source: unknown; confidence: number
    }>>
  }
}

function toRecord(r: Awaited<ReturnType<PrismaLike['spineEvent']['findMany']>>[number]): SpineEventRecord {
  return {
    eventId: r.eventId, seq: r.seq, learnerId: r.learnerId, sessionId: r.sessionId,
    turnId: r.turnId, type: r.type, schemaVersion: r.schemaVersion,
    payload: r.payload, source: r.source as SpineSource, confidence: r.confidence,
  }
}

const PAGE = 500

/** Load ALL events for a learner, seq-ascending, paged. */
export async function loadSpineEvents(prisma: PrismaLike, learnerId: string): Promise<SpineEventRecord[]> {
  const out: SpineEventRecord[] = []
  let after = 0
  // Paged by seq cursor so replay memory is bounded per page fetch.
  for (;;) {
    const page = await prisma.spineEvent.findMany({
      where: { learnerId, seq: { gt: after } },
      orderBy: { seq: 'asc' },
      take: PAGE,
    })
    if (page.length === 0) break
    for (const r of page) out.push(toRecord(r))
    after = page[page.length - 1].seq
    if (page.length < PAGE) break
  }
  return out
}

/** Full replay: rebuild the StudentView projection from the log. */
export async function replayStudentView(prisma: PrismaLike, learnerId: string): Promise<StudentViewProjection> {
  const events = await loadSpineEvents(prisma, learnerId)
  return foldAll(learnerId, events)
}

/**
 * Snapshot verification (RS L4 / P-6): a snapshot claimed at watermark W
 * must equal folding the log up to W. Returns the mismatch report or null.
 * Pure given the events.
 */
export function verifySnapshot(
  snapshot: StudentViewProjection,
  events: SpineEventRecord[],
): { field: string } | null {
  const upToWatermark = events.filter((e) => e.seq <= snapshot.foldedThroughSeq)
  const rebuilt = foldAll(snapshot.learnerId, upToWatermark)
  const a = JSON.stringify(rebuilt)
  const b = JSON.stringify(snapshot)
  if (a === b) return null
  return { field: 'projection mismatch (snapshot ≠ re-fold)' }
}

/** Incremental fold: continue a snapshot with the log tail. Pure. */
export function foldTail(
  snapshot: StudentViewProjection,
  events: SpineEventRecord[],
): StudentViewProjection {
  const tail = events
    .filter((e) => e.seq > snapshot.foldedThroughSeq)
    .sort((x, y) => x.seq - y.seq)
  return foldEvents(snapshot, tail)
}

export { foldAll, foldEvents, initialStudentView }

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
import { foldAll, foldEvents, initialStudentView, type CapabilityProjection, type StudentViewProjection } from './fold'
import type { SpineEventRecord, SpineEventType, SpineSource } from './types'

type PrismaLike = {
  spineEvent: {
    findMany(args: {
      where: { learnerId: string; seq?: { gt: number }; type?: { in: string[] } }
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
 * EGRESS-2. Load only events of the given types for a learner, seq-ascending,
 * paged exactly like `loadSpineEvents` — the only difference is a `type`
 * filter added to the WHERE clause. `spine_events` already carries
 * `@@index([learnerId, type])` (prisma/schema.prisma), so this is index-
 * backed and needed no migration.
 */
export async function loadSpineEventsOfType(
  prisma: PrismaLike, learnerId: string, types: readonly SpineEventType[],
): Promise<SpineEventRecord[]> {
  const out: SpineEventRecord[] = []
  let after = 0
  for (;;) {
    const page = await prisma.spineEvent.findMany({
      where: { learnerId, type: { in: [...types] }, seq: { gt: after } },
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

/**
 * Replay ONLY the capability projection — the one slice route.ts's
 * cold-session hydration actually reads (`hydrateFromProjection(view
 * .capability)`; `.teaching`/`.conversation`/`.recovery`/`.answers`/
 * `.decisions` were always discarded at that call site).
 *
 * PROVABLY IDENTICAL to `(await replayStudentView(prisma, learnerId))
 * .capability`: `foldEvent`'s switch (fold.ts) writes `.capability` in
 * exactly one branch, `case 'CapabilityObserved'`; every other case reads
 * only its own event's payload and writes only its own projection slice —
 * none reads `v.capability` as an input to its own transition. So filtering
 * the input stream to CapabilityObserved events before folding cannot
 * change the `.capability` result, by inspection of that switch statement
 * (see spineCapabilityReplayScope.test.ts for the equivalence proved
 * against the real fold, and a structural guard that a future case
 * touching `.capability` outside that branch fails the build).
 *
 * This is the EGRESS-2 fix layered on EGRESS-1 (2026-08-31, route.ts):
 * EGRESS-1 correctly bounded the replay to once per genuinely-new session,
 * but the bounded call still fetched the learner's ENTIRE event log to
 * answer a question only one event type can affect. For a heavily-used
 * learner (hundreds of sessions), that one-time-per-session cost is itself
 * large and recurs on every new session.
 */
export async function replayCapabilityProjection(
  prisma: PrismaLike, learnerId: string,
): Promise<CapabilityProjection> {
  const events = await loadSpineEventsOfType(prisma, learnerId, ['CapabilityObserved'])
  return foldAll(learnerId, events).capability
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

/**
 * Snapshot persistence — the single-writer discipline.
 *
 * Traced pipeline: ConversationState → snapshot creation → persistence →
 * reload → rehydration.
 *
 * The chat route's own persist is version-conditional (ISS-13,
 * writeSnapshotDelta): it reads `_v` at the start of the turn, writes only if
 * `_v` has not moved, and on conflict re-reads, re-derives every accumulative
 * fold, and writes once more. That protocol only holds if EVERY writer to
 * contextSnapshot participates in it.
 *
 * One did not. /api/curriculum/progress's "Skip Anyway" branch cleared the
 * session's concept pointer and conversationState with a read-modify-write of
 * the whole column that never read, checked, or advanced `_v`. This file pins
 * both failure orderings it produced, and the single-writer property that
 * prevents them.
 *
 * Driven against a fake DB with the real UPDATE's semantics — the same
 * discipline snapshotWrite.test.ts uses — so the interleavings are
 * deterministic rather than timing-dependent.
 */
import { describe, it, expect } from 'vitest'
import {
  writeSnapshotDelta, readSnapshotVersion, SNAPSHOT_VERSION_KEY,
  type SnapshotDb,
} from '@/lib/db/snapshotWrite'

/** A LearnSession row with the real UPDATE's semantics: the conditional jsonb
 *  merge applies only when the stored version equals the expected one. */
function fakeDb(initial: Record<string, unknown> | null) {
  const state = { snapshot: initial as Record<string, unknown> | null }
  const db: SnapshotDb = {
    async $executeRawUnsafe(_q: string, ...values: unknown[]) {
      const [payload, , expected] = values as [string, string, number]
      if (readSnapshotVersion(state.snapshot) !== expected) return 0
      state.snapshot = { ...(state.snapshot ?? {}), ...JSON.parse(payload) }
      return 1
    },
    learnSession: {
      async findUnique() { return { contextSnapshot: state.snapshot } },
    },
  }
  return { db, state }
}

/** What the skip branch does now: the three-key clear, through the versioned
 *  writer. Mirrors /api/curriculum/progress exactly, including no rederive —
 *  clearing keys is a pure state replacement. */
function skipClear(db: SnapshotDb, sessionId: string, rowSnapshot: unknown) {
  return writeSnapshotDelta(db, {
    sessionId,
    expectedVersion: readSnapshotVersion(rowSnapshot),
    delta: { currentConceptNodeId: null, nextConceptNodeId: null, conversationState: null },
  })
}

/** What it did BEFORE: replace the whole column, spreading the version back
 *  out unchanged. Kept as an executable record of the defect. */
function legacySkipClear(state: { snapshot: Record<string, unknown> | null }) {
  const snap = (state.snapshot ?? {}) as Record<string, unknown>
  state.snapshot = {
    ...snap,
    currentConceptNodeId: null,
    nextConceptNodeId: null,
    conversationState: null,
  }
}

const TURN_STATE = { phase: 'CHECK', correctAtCheck: 1 }

describe('the skip writer participates in the version protocol', () => {
  it('advances the version, so a concurrent turn can detect it', () => {
    const { db, state } = fakeDb({ [SNAPSHOT_VERSION_KEY]: 7, currentConceptNodeId: 'c1' })
    const before = readSnapshotVersion(state.snapshot)
    return skipClear(db, 's1', state.snapshot).then((r) => {
      expect(r.applied).toBe(true)
      expect(readSnapshotVersion(state.snapshot)).toBe(before + 1)
    })
  })

  it('the OLD writer left the version behind — the defect, pinned', () => {
    const { state } = fakeDb({ [SNAPSHOT_VERSION_KEY]: 7, currentConceptNodeId: 'c1' })
    legacySkipClear(state)
    // Content changed, version did not. This is what blinded the detector.
    expect(state.snapshot!.currentConceptNodeId).toBeNull()
    expect(readSnapshotVersion(state.snapshot)).toBe(7)
  })

  it('merges only its three keys — unrelated fields survive', async () => {
    const { db, state } = fakeDb({
      [SNAPSHOT_VERSION_KEY]: 3,
      currentConceptNodeId: 'c1',
      sessionFailureCount: 2,
      sessionEpisode: { phase: 'CORE' },
      objectiveState: { objectiveId: 'o1' },
    })
    await skipClear(db, 's1', state.snapshot)
    expect(state.snapshot).toMatchObject({
      currentConceptNodeId: null,
      nextConceptNodeId: null,
      conversationState: null,
      sessionFailureCount: 2,
      sessionEpisode: { phase: 'CORE' },
      objectiveState: { objectiveId: 'o1' },
    })
  })
})

describe('ordering A — skip lands while a chat turn is in flight', () => {
  it('the turn conflicts and re-derives instead of resurrecting the concept', async () => {
    const { db, state } = fakeDb({ [SNAPSHOT_VERSION_KEY]: 5, currentConceptNodeId: 'c1' })

    // The chat turn reads its base at the start of the turn.
    const turnBase = readSnapshotVersion(state.snapshot)

    // Learner clicks "Skip Anyway" mid-turn.
    await skipClear(db, 's1', state.snapshot)
    expect(state.snapshot!.conversationState).toBeNull()

    // The turn now persists. Its base has moved, so it must conflict.
    let rederived = false
    const r = await writeSnapshotDelta(db, {
      sessionId: 's1',
      expectedVersion: turnBase,
      delta: { conversationState: TURN_STATE, currentConceptNodeId: 'c1' },
      rederive: (fresh) => {
        rederived = true
        // A real re-derive reads the fresh base — which now says "cleared".
        expect(fresh.conversationState).toBeNull()
        expect(fresh.currentConceptNodeId).toBeNull()
        return { conversationState: null, currentConceptNodeId: null }
      },
    })

    expect(r.conflicted).toBe(true)
    expect(rederived).toBe(true)
    expect(state.snapshot!.currentConceptNodeId).toBeNull()
    expect(state.snapshot!.conversationState).toBeNull()
  })

  it('with the OLD writer the turn did NOT conflict, and undid the skip', async () => {
    const { db, state } = fakeDb({ [SNAPSHOT_VERSION_KEY]: 5, currentConceptNodeId: 'c1' })
    const turnBase = readSnapshotVersion(state.snapshot)

    legacySkipClear(state)                       // version stays 5
    expect(state.snapshot!.conversationState).toBeNull()

    let rederived = false
    const r = await writeSnapshotDelta(db, {
      sessionId: 's1',
      expectedVersion: turnBase,                 // still matches — detector blind
      delta: { conversationState: TURN_STATE, currentConceptNodeId: 'c1' },
      rederive: () => { rederived = true; return {} },
    })

    // No conflict was ever reported, so nothing re-derived...
    expect(r.conflicted).toBe(false)
    expect(rederived).toBe(false)
    // ...and the skip is silently undone: the session resumes the skipped
    // concept, which is exactly "skip never actually skipped".
    expect(state.snapshot!.currentConceptNodeId).toBe('c1')
    expect(state.snapshot!.conversationState).toEqual(TURN_STATE)
  })
})

describe('ordering B — a chat turn lands while the skip is in flight', () => {
  it('the skip conflicts and retries against the newer base', async () => {
    const { db, state } = fakeDb({ [SNAPSHOT_VERSION_KEY]: 2, currentConceptNodeId: 'c1' })

    // The skip endpoint reads the row...
    const skipBase = state.snapshot

    // ...and a chat turn commits first.
    await writeSnapshotDelta(db, {
      sessionId: 's1', expectedVersion: 2,
      delta: { conversationState: TURN_STATE, sessionFailureCount: 1 },
    })
    expect(readSnapshotVersion(state.snapshot)).toBe(3)

    // The skip now writes against its stale base: conflict, then retry.
    const r = await skipClear(db, 's1', skipBase)
    expect(r).toMatchObject({ applied: true, conflicted: true })
    // The clear still lands...
    expect(state.snapshot!.conversationState).toBeNull()
    expect(state.snapshot!.currentConceptNodeId).toBeNull()
    // ...and the turn's unrelated field is NOT lost.
    expect(state.snapshot!.sessionFailureCount).toBe(1)
  })

  it('the OLD writer discarded the whole concurrent turn, not just conflicts', async () => {
    const { db, state } = fakeDb({ [SNAPSHOT_VERSION_KEY]: 2, currentConceptNodeId: 'c1' })

    const staleRead = { ...(state.snapshot as Record<string, unknown>) }   // skip reads here

    await writeSnapshotDelta(db, {
      sessionId: 's1', expectedVersion: 2,
      delta: { conversationState: TURN_STATE, sessionFailureCount: 1 },
    })

    // Whole-column replacement from the stale read.
    state.snapshot = {
      ...staleRead,
      currentConceptNodeId: null, nextConceptNodeId: null, conversationState: null,
    }

    // sessionFailureCount — a field the skip never meant to touch — is gone.
    expect(state.snapshot.sessionFailureCount).toBeUndefined()
    expect(readSnapshotVersion(state.snapshot)).toBe(2)   // and the version rewound
  })
})

describe('the clear is durable under a doubled skip', () => {
  it('two skips in a row both apply and leave the pointer cleared', async () => {
    const { db, state } = fakeDb({ [SNAPSHOT_VERSION_KEY]: 1, currentConceptNodeId: 'c1' })
    const a = await skipClear(db, 's1', state.snapshot)
    const b = await skipClear(db, 's1', state.snapshot)
    expect(a.applied).toBe(true)
    expect(b.applied).toBe(true)
    expect(state.snapshot!.currentConceptNodeId).toBeNull()
    expect(readSnapshotVersion(state.snapshot)).toBe(3)
  })

  it('never throws when the session row is gone', async () => {
    const db: SnapshotDb = {
      async $executeRawUnsafe() { return 0 },
      learnSession: { async findUnique() { return null } },
    }
    const r = await skipClear(db, 'missing', { [SNAPSHOT_VERSION_KEY]: 1 })
    expect(r).toMatchObject({ applied: false, conflicted: true, version: null })
  })
})

// ── The single-writer guard ──────────────────────────────────────────────────

/**
 * Everything above tests writeSnapshotDelta's behaviour, which would keep
 * passing if a caller stopped using it. The protocol's actual invariant is
 * about CALL SITES: an UPDATE that sets contextSnapshot outside the versioned
 * writer silently opts that path out of lost-update detection, which is the
 * defect this file exists for. So the source itself is the assertion.
 *
 * The one legitimate exception is row CREATION: there is no prior version to
 * conflict with, and no concurrent turn can exist for a session that does not
 * exist yet.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

function sourceFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) sourceFiles(full, acc)
    else if (/\.tsx?$/.test(entry) && !/\.test\.tsx?$/.test(entry)) acc.push(full)
  }
  return acc
}

describe('contextSnapshot has exactly one mutating writer', () => {
  /** Files allowed to set contextSnapshot in a Prisma `data:` payload. */
  const CREATION_ONLY = ['src/app/api/sessions/route.ts']

  it('no route mutates the column outside writeSnapshotDelta', () => {
    const offenders: string[] = []
    for (const file of sourceFiles('src')) {
      const src = readFileSync(file, 'utf8')
      // A Prisma update whose data payload assigns contextSnapshot.
      const updates = src.match(
        /learnSession\s*\.\s*update(?:Many)?\s*\(\s*\{[\s\S]{0,600}?contextSnapshot\s*:/g,
      )
      if (!updates) continue
      const rel = file.replace(/\\/g, '/')
      if (!CREATION_ONLY.includes(rel)) offenders.push(rel)
    }
    expect(offenders).toEqual([])
  })

  it('the skip branch reaches the versioned writer', () => {
    const src = readFileSync('src/app/api/curriculum/progress/route.ts', 'utf8')
    expect(src).toMatch(/writeSnapshotDelta/)
    expect(src).toMatch(/readSnapshotVersion/)
  })

  it('the guard would catch a raw column write', () => {
    // The regex is the load-bearing part, so it is tested against a sample of
    // the exact shape it must reject — the code this commit removed.
    const reverted = `
      await prisma.learnSession.update({
        where: { id: activeSession.id },
        data: { contextSnapshot: { ...snap, conversationState: null } },
      })
    `
    expect(reverted).toMatch(
      /learnSession\s*\.\s*update(?:Many)?\s*\(\s*\{[\s\S]{0,600}?contextSnapshot\s*:/,
    )
  })
})

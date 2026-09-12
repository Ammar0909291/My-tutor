/**
 * ENG-D18 — a 500 from session-create must say WHICH failure it was.
 *
 * Six `session create failed: "Internal server error"` events were recorded
 * across ~175 concepts of English audit traffic. Five correlated with
 * `/api/health` reporting `db:false`; the SIXTH read `db:true` immediately
 * afterwards and its retry succeeded at once. The audit could not classify it,
 * because the route returned one opaque sentence for every non-Zod failure and
 * a health poll after the fact measures a different moment.
 *
 * These cases pin the classifier itself (the predicate `withRetry` already
 * used, now shared rather than copied) and the route wiring that calls it.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { isDbConnectionError, withRetry } from '@/lib/db/withRetry'
import { TimeoutError } from '@/lib/net/timeout'

describe('isDbConnectionError — the lifted predicate', () => {
  it('recognises every Prisma connection-class code withRetry retried on', () => {
    for (const code of ['P1001', 'P1002', 'P1008', 'P1017', 'P2024']) {
      expect(isDbConnectionError({ code })).toBe(true)
    }
  })

  it('recognises every message fragment withRetry retried on', () => {
    for (const message of [
      "Can't reach database server at `db:5432`",
      'Connection reset by peer',
      'terminating connection due to administrator command',
      'connection terminated unexpectedly',
      'connection closed',
      'Socket timeout',
      'Timed out fetching a new connection from the connection pool',
    ]) {
      expect(isDbConnectionError({ message })).toBe(true)
    }
  })

  it('is FALSE for the failures that are not the database being unreachable', () => {
    // These are exactly the class the audit's sixth instance belongs to: a 500
    // while the database is demonstrably healthy. Reporting them as db_unavailable
    // is the mistake this classifier exists to stop.
    expect(isDbConnectionError(new TypeError('x is not a function'))).toBe(false)
    expect(isDbConnectionError({ code: 'P2002', message: 'Unique constraint failed' })).toBe(false)
    expect(isDbConnectionError({ code: 'P2025', message: 'Record to update not found' })).toBe(false)
    expect(isDbConnectionError(new TimeoutError(10000, 'session.create'))).toBe(false)
    expect(isDbConnectionError(null)).toBe(false)
    expect(isDbConnectionError(undefined)).toBe(false)
    expect(isDbConnectionError('boom')).toBe(false)
    expect(isDbConnectionError({})).toBe(false)
  })

  it('a slow database and an unreachable one are different findings', () => {
    const timeout = new TimeoutError(10000, 'session.create')
    expect(timeout instanceof TimeoutError).toBe(true)
    expect(isDbConnectionError(timeout)).toBe(false)
  })
})

describe('withRetry still retries on exactly the same set', () => {
  it('retries a connection-class error and then succeeds', async () => {
    let n = 0
    const out = await withRetry(async () => {
      n += 1
      if (n === 1) throw Object.assign(new Error('Connection reset'), { code: 'P1001' })
      return 'ok'
    }, 3, 1)
    expect(out).toBe('ok')
    expect(n).toBe(2)
  })

  it('does NOT retry a non-connection error', async () => {
    let n = 0
    await expect(withRetry(async () => {
      n += 1
      throw new TypeError('not a connection problem')
    }, 3, 1)).rejects.toThrow('not a connection problem')
    expect(n).toBe(1)
  })
})

describe('route wiring', () => {
  const src = fs.readFileSync(
    path.join(process.cwd(), 'src/app/api/sessions/route.ts'), 'utf8',
  )

  it('classifies the caught error rather than reporting one opaque failure', () => {
    expect(src).toContain('isDbConnectionError(err)')
    expect(src).toContain("'db_unavailable'")
    expect(src).toContain("'db_timeout'")
    expect(src).toContain("'unknown'")
  })

  it('returns the classification additively, without widening the payload', () => {
    expect(src).toContain('session-create-failed')
    expect(src).toMatch(/success: false, error: "Internal server error", kind/)
    // Coarse on purpose — no message, stack, or query may ride the response.
    expect(src).not.toMatch(/error: "Internal server error",[^}]*err\.message/)
  })

  it('imports the shared predicate rather than re-authoring the list', () => {
    expect(src).toMatch(/import \{ withRetry, isDbConnectionError \} from "@\/lib\/db\/withRetry"/)
    expect(src).not.toContain("'P1001'")
  })
})

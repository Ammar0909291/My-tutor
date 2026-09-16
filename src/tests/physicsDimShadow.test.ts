/**
 * DETERMINISTIC PHYSICS VERIFIER — Batch 3 shadow wiring, proved against
 * the real modules and pinned against both routes' own source.
 *
 * Design: `docs/architecture/DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §5.6,
 * §6 row 3. Modelled directly on `learnerMoveShadow.test.ts` — same PII
 * discipline, same "exactly one emit site per route" / "wrapped so it can
 * never break the turn" pins, extended to BOTH routes since §5.6/§6 row 3
 * explicitly require both in the same batch (closing §2.1's own named
 * asymmetry rather than repeating it — every prior shadow telemetry module
 * in this file's neighbourhood, LEARNER_MOVE/EXCURSION_EVENT/TURN_EVENT,
 * is chat-route-only).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { CONCEPT_DIMENSION_BINDINGS } from '@/lib/teaching/physics/dimensionBindings'
import { diagnosePhysicsDim } from '@/lib/teaching/physics/dimensionalVerifier'
import {
  buildPhysicsDimEvent, recordPhysicsDimEvent, PHYSICS_DIM_EVENT_PREFIX,
} from '@/lib/teaching/physicsDimTelemetry'

const SESSION = 'cmtky68dm0009l204a7c210s7'
const T0 = Date.parse('2026-09-16T03:10:00.000Z')

describe('no equation text, no draft text, no learner text reaches the event', () => {
  const SECRET = 'Ammar was confused about learner@example.com'
  const binding = CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum']

  it('a genuine violation — whose own text the diagnosis DOES compute — never leaks the equation into the event', () => {
    const diagnosis = diagnosePhysicsDim(`${SECRET}. The formula is F = m.`, binding)
    // Sanity: the diagnosis really did find a violation, and the violation
    // object really does carry the equation text — proving the event
    // builder is what strips it, not an accident of the fixture.
    expect(diagnosis.gate).toBe('violation')
    expect(diagnosis.violation?.equationText).toBe('F = m')

    const event = buildPhysicsDimEvent({
      diagnosis, sessionId: SESSION, route: 'chat', subject: 'physics',
      conceptId: 'phys.mech.momentum', hasBinding: true, turnReceivedAt: T0,
    })
    const serialised = JSON.stringify(event)
    expect(serialised).not.toContain('Ammar')
    expect(serialised).not.toContain('example.com')
    expect(serialised).not.toContain('F = m')
  })

  it('the event carries no equationText, lhsDimension, rhsDimension, draft, or message field at all', () => {
    const diagnosis = diagnosePhysicsDim('The formula is F = m.', binding)
    const event = buildPhysicsDimEvent({
      diagnosis, sessionId: SESSION, route: 'chat', subject: 'physics',
      conceptId: 'phys.mech.momentum', hasBinding: true, turnReceivedAt: T0,
    })
    const keys = Object.keys(event)
    expect(keys).not.toContain('equationText')
    expect(keys).not.toContain('lhsDimension')
    expect(keys).not.toContain('rhsDimension')
    expect(keys).not.toContain('draft')
    expect(keys).not.toContain('message')
    expect(keys).not.toContain('text')
    // sessionId is the correlation id, and it is a cuid, not a person
    expect(keys).toContain('sessionId')
  })

  it('only the closed-enum gate and booleans/counts carry the classification — no free text field exists', () => {
    const diagnosis = diagnosePhysicsDim('Nothing to see here.', binding)
    const event = buildPhysicsDimEvent({
      diagnosis, sessionId: SESSION, route: 'lesson-init', subject: 'physics',
      conceptId: 'phys.mech.momentum', hasBinding: true, turnReceivedAt: T0,
    })
    expect(event.gate).toBe('no-extraction')
    expect(typeof event.violationFound).toBe('boolean')
    expect(typeof event.hasBinding).toBe('boolean')
    const allowedKeys = new Set(['v', 'sessionId', 'turnKey', 'route', 'subject', 'conceptId', 'hasBinding', 'gate', 'violationFound', 'ts'])
    for (const k of Object.keys(event)) expect(allowedKeys.has(k), `unexpected field "${k}"`).toBe(true)
  })
})

describe('both routes wire the shadow exactly once, safely, at the correct position', () => {
  const CHAT = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')
  const LESSON_INIT = readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf-8')

  it('chat route: exactly one emit site', () => {
    expect(CHAT.split('recordPhysicsDimEvent(').length - 1).toBe(1)
  })

  it('lesson-init route: exactly one emit site', () => {
    expect(LESSON_INIT.split('recordPhysicsDimEvent(').length - 1).toBe(1)
  })

  it('chat route: the shadow runs AFTER repairVisionDirection and BEFORE vAffirm', () => {
    const visionAt = CHAT.indexOf('repairVisionDirection(cleanText,')
    const emitAt = CHAT.indexOf('recordPhysicsDimEvent(')
    const affirmAt = CHAT.indexOf('const firstViolation = vAffirm(cleanText, affirmCtx)')
    expect(visionAt).toBeGreaterThan(-1)
    expect(emitAt).toBeGreaterThan(-1)
    expect(affirmAt).toBeGreaterThan(-1)
    expect(visionAt).toBeLessThan(emitAt)
    expect(emitAt).toBeLessThan(affirmAt)
  })

  it('lesson-init route: the shadow runs immediately after repairVisionDirection', () => {
    const visionAt = LESSON_INIT.indexOf('repairVisionDirection(routed.text, topicSlug)')
    const emitAt = LESSON_INIT.indexOf('recordPhysicsDimEvent(')
    expect(visionAt).toBeGreaterThan(-1)
    expect(emitAt).toBeGreaterThan(-1)
    expect(visionAt).toBeLessThan(emitAt)
  })

  it('chat route: the emit is wrapped so it can never break the turn', () => {
    const i = CHAT.indexOf('recordPhysicsDimEvent(')
    const start = CHAT.lastIndexOf('SHADOW ONLY (Batch 3)', i)
    expect(start).toBeGreaterThan(-1)
    const tryAt = CHAT.indexOf('try {', start)
    expect(tryAt).toBeGreaterThan(-1)
    expect(tryAt).toBeLessThan(i)
    const catchAt = CHAT.indexOf('} catch', tryAt)
    expect(catchAt).toBeGreaterThan(i)
  })

  it('lesson-init route: the emit is wrapped so it can never break the opening', () => {
    const i = LESSON_INIT.indexOf('recordPhysicsDimEvent(')
    const start = LESSON_INIT.lastIndexOf('SHADOW ONLY (Batch 3)', i)
    expect(start).toBeGreaterThan(-1)
    const tryAt = LESSON_INIT.indexOf('try {', start)
    expect(tryAt).toBeGreaterThan(-1)
    expect(tryAt).toBeLessThan(i)
    const catchAt = LESSON_INIT.indexOf('} catch', tryAt)
    expect(catchAt).toBeGreaterThan(i)
  })

  it('neither route uses the shadow\'s output to change served content — no consumer exists', () => {
    // The diagnosis/violation is computed and immediately handed to the
    // telemetry builder; nothing else in either route reads
    // `physicsDimDiagnosis`/`physicsDimBinding` beyond that one call.
    for (const [route, src] of [['chat', CHAT], ['lesson-init', LESSON_INIT]] as const) {
      const count = (src.match(/physicsDimDiagnosis/g) ?? []).length
      // Exactly 2 occurrences: the declaration and the one read inside
      // buildPhysicsDimEvent's own argument object.
      expect(count, route).toBe(2)
    }
  })

  it('neither route repairs cleanText/routed.text from the physics shadow block — content is byte-identical before and after', () => {
    for (const [route, src] of [['chat', CHAT], ['lesson-init', LESSON_INIT]] as const) {
      const start = src.lastIndexOf('SHADOW ONLY (Batch 3)')
      const end = src.indexOf('recordPhysicsDimEvent(', start)
      const block = src.slice(start, end)
      expect(block, route).not.toMatch(/cleanText\s*=/)
      expect(block, route).not.toMatch(/routed\s*=\s*\{/)
    }
  })

  it('no database write exists anywhere in the new code (dimensionalVerifier.ts, physicsDimTelemetry.ts, or either wiring block)', () => {
    const verifier = readFileSync('src/lib/teaching/physics/dimensionalVerifier.ts', 'utf-8')
    const telemetry = readFileSync('src/lib/teaching/physicsDimTelemetry.ts', 'utf-8')
    for (const src of [verifier, telemetry]) {
      expect(src).not.toMatch(/\bprisma\./i)
    }
    for (const [route, src] of [['chat', CHAT], ['lesson-init', LESSON_INIT]] as const) {
      const start = src.lastIndexOf('SHADOW ONLY (Batch 3)')
      const end = src.indexOf('recordPhysicsDimEvent(', start) + 'recordPhysicsDimEvent('.length
      // Find the end of the enclosing try block, not just the call site.
      const blockEnd = src.indexOf('} catch', end)
      const block = src.slice(start, blockEnd)
      expect(block, route).not.toMatch(/\bprisma\./i)
    }
  })

  it('the log prefix is the shared constant, so an aggregation query cannot drift', () => {
    expect(PHYSICS_DIM_EVENT_PREFIX).toBe('[learn/chat] PHYSICS_DIM=')
  })

  it('dimensionBindings.ts and dimensions.ts are read-only from both wiring blocks — no write, no mutation of the registry', () => {
    for (const [route, src] of [['chat', CHAT], ['lesson-init', LESSON_INIT]] as const) {
      const start = src.lastIndexOf('SHADOW ONLY (Batch 3)')
      const end = src.indexOf('recordPhysicsDimEvent(', start)
      const block = src.slice(start, end)
      expect(block, route).not.toMatch(/CONCEPT_DIMENSION_BINDINGS\s*\[[^\]]+\]\s*=/)
      expect(block, route).not.toMatch(/CONCEPT_DIMENSION_BINDINGS\s*=\s*\{/)
    }
  })
})

// The record function itself must never throw outward, matching
// learnerMoveTelemetry/excursionTelemetry/brainMetrics' own fail-open
// contract — exercised directly since `console.log` cannot meaningfully be
// made to throw from a test without mocking it, which would test the mock,
// not the guarantee.
describe('recordPhysicsDimEvent never breaks the caller', () => {
  it('is callable and returns void even for a maximal event', () => {
    const binding = CONCEPT_DIMENSION_BINDINGS['phys.mech.momentum']
    const diagnosis = diagnosePhysicsDim('The formula is F = m.', binding)
    const event = buildPhysicsDimEvent({
      diagnosis, sessionId: SESSION, route: 'chat', subject: 'physics',
      conceptId: 'phys.mech.momentum', hasBinding: true, turnReceivedAt: T0,
    })
    expect(recordPhysicsDimEvent(event)).toBeUndefined()
  })
})

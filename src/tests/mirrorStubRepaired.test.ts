/**
 * THE MIRROR REPAIR'S VERDICT IS A STUB, AND IS REPAIRED LIKE ONE.
 *
 * Weak-learner QA, production, 2026-10-03 (math.arith.fraction-addition, T4):
 * the learner answered "5/6 — rewrite as 3/6 + 2/6" (graded correct); the
 * model only mirrored it back, `repairMirrorWithVerdict` replaced the reply with
 * the server's verdict, and the learner's whole reply was "That's right." —
 * nothing about why. The gate-contract cut's stub already takes one
 * regeneration (repairStubReply); the mirror's did not, because it is written
 * before the repair exists in the route. It is now handed over the same way.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { repairMirrorWithVerdict } from '@/lib/teaching/attributionGuard'
import { needsRepair } from '@/lib/teaching/confirmBackRepair'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')

describe('the mirror repair hands its verdict-only reply to the stub repair', () => {
  it('a correct mirror becomes a bare verdict, which is a stub', () => {
    const r = repairMirrorWithVerdict({
      text: "So you're saying it's 5/6 because you rewrote them as 3/6 + 2/6. Is that right?",
      learnerMessage: '5/6 — rewrite as 3/6 + 2/6',
      graded: { correct: true, correctOptionText: '5/6' },
    })
    expect(r.text).toBe("That's right.")
    expect(needsRepair(r.text)).toBe(true)
  })

  it('records the stub where the mirror repair replaces the reply', () => {
    const at = ROUTE.indexOf("event: 'mirror-replaced-with-server-verdict'")
    const record = ROUTE.indexOf('mirrorStubHoisted = mirrored.text')
    expect(at).toBeGreaterThan(0)
    expect(record).toBeGreaterThan(at)
    expect(record - at).toBeLessThan(1200)
  })

  it('repairs it once, after repairStubReply exists, only while the reply still opens with it', () => {
    const defined = ROUTE.indexOf('const repairStubReply = async')
    const use = ROUTE.indexOf("repairStubReply(mirrorStubHoisted, 'mirror')")
    expect(use).toBeGreaterThan(defined)
    expect(ROUTE).toMatch(/if \(mirrorStubHoisted && cleanText\.startsWith\(mirrorStubHoisted\)\)/)
    expect(ROUTE).toMatch(/if \(repaired\) cleanText = repaired \+ cleanText\.slice\(mirrorStubHoisted\.length\)/)
  })
})

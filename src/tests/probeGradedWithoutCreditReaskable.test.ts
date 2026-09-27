/**
 * An authored probe answered CORRECTLY where a correct answer banks no mastery
 * credit (OBSERVE, DEMONSTRATE, GUIDE) is not lost: it gets the one re-ask a
 * missed probe gets. MEASURED live (Biology batch 13, 2026-09-27): with three
 * authored probes per concept, 9 of 17 lessons where every answer was correct
 * could not reach verified mastery because the first probe was graded at
 * GUIDE and spent. Owner decision: option (c).
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { isMissedAndReaskable, recordMcqAsked, recordMcqOutcome } from '@/lib/teaching/teachingHistory'
import { initialTeachingHistory } from '@/lib/teaching/teachingHistory'

const Q = 'Which wound-healing stage lasts longest?'

describe('a correct answer graded without credit keeps its probe', () => {
  it('correct at GUIDE -> re-askable once', () => {
    const h = recordMcqOutcome(recordMcqAsked(initialTeachingHistory('bio.physio.integumentary-system'), Q), Q, true, true)
    expect(isMissedAndReaskable(h, Q)).toBe(true)
    const again = recordMcqOutcome(recordMcqAsked(h, Q), Q, true, false)
    expect(isMissedAndReaskable(again, Q)).toBe(false) // one re-ask only, never a loop
  })

  it('correct at CHECK/PRACTICE is spent exactly as before', () => {
    const h = recordMcqOutcome(recordMcqAsked(initialTeachingHistory('bio.physio.integumentary-system'), Q), Q, true, false)
    expect(isMissedAndReaskable(h, Q)).toBe(false)
  })

  it('wrong answers are unchanged (already re-askable once)', () => {
    const h = recordMcqOutcome(initialTeachingHistory('bio.physio.integumentary-system'), Q, false)
    expect(isMissedAndReaskable(h, Q)).toBe(true)
  })

  it('the route passes the grading phase to both writers', () => {
    const route = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
    expect(route).toContain("phaseBeforeTurnHoisted === 'GUIDE'")
    expect(route.match(/recordMcqOutcome\([^)]*spentWithoutCredit\)/g)?.length).toBe(2)
  })
})

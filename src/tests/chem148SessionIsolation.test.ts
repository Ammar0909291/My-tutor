/**
 * CHEM-148 / CHEM-130 (chemistry real-learner run, 2026-10-05).
 *
 * CHEM-148 — three lessons open at once on one account were taught one
 * lesson's content and figure. REPRODUCED LIVE (2026-10-05, disposable
 * account, scripts/qa/sessionShareProbe.ts, the QA driver's shape: per lesson
 * POST /api/sessions then lesson-init, then interleaved turns):
 *   no tabId      -> distinctSessions 1 of 3; all three taught lesson #8
 *   distinct tabs -> distinctSessions 3 of 3; each lesson its own figure/cards
 * Cause: a request with no tab identity resumes the newest session
 * (sessionLessonPointer.ts, PCD-004A's deliberate no-tab rule). The browser
 * always sends a per-tab id (tabIdentity.ts) unless storage throws.
 *
 * CHEM-130 — "i dont understand this picture" in a lesson with no figure was
 * answered about an EARLIER lesson's figure. Cause: lesson-init cleared
 * `visualSession` but not `renderedRealityLog`, whose last entry the prompt
 * presents as "what the learner's screen shows" — and a tab resumes its own
 * session for the next lesson.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { chooseResumableSession, sessionTabOwnerDelta } from '@/lib/teaching/sessionLessonPointer'
import { readRRM, buildRenderedRealityBlock, clearRenderedRealityForLessonOpen } from '@/lib/teaching/renderedRealityModel'

const NOW = new Date('2026-10-05T14:53:00Z')

describe('CHEM-148: three tabs on one account open three sessions', () => {
  it('each tab-identified request gets its own session, and each resumes its own', () => {
    const sessions: Array<{ id: string; contextSnapshot: unknown; tab: string }> = []
    for (const tab of ['tab-3', 'tab-5', 'tab-8']) {
      const r = chooseResumableSession({ candidates: sessions, tabId: tab, now: NOW })
      expect(r.reason).toBe('create-new')
      sessions.unshift({ id: `S-${tab}`, contextSnapshot: sessionTabOwnerDelta(tab, NOW), tab })
    }
    for (const s of sessions) {
      expect(chooseResumableSession({ candidates: sessions, tabId: s.tab, now: NOW }).session?.id).toBe(s.id)
    }
  })
  it('the reproduced shape: with NO tab identity all three resume one session (documented, by design)', () => {
    const sessions = [{ id: 'S-first', contextSnapshot: {} }]
    expect(chooseResumableSession({ candidates: sessions, tabId: undefined, now: NOW }).session?.id).toBe('S-first')
  })
})

describe('CHEM-130: a new lesson starts with an empty screen', () => {
  const WILKINSON = {
    visualIdentity: 'scene:Wilkinson\'s catalyst hydrogenation cycle',
    visualSemantics: 'catalytic cycle: oxidative addition of H2, alkene binding, reductive elimination',
    turnPosition: 4, sourcePipeline: 'visual-v2', matchedConcept: 'chem.inorg.organometallic',
  }
  it('before the fix the next lesson\'s prompt still named the old figure as on screen', () => {
    const block = buildRenderedRealityBlock(readRRM({ renderedRealityLog: [WILKINSON] }))
    expect(block).toMatch(/CURRENT VISUAL/)
    expect(block).toMatch(/Wilkinson/)
  })
  it('after the lesson-open delta the block says no visual is displayed', () => {
    const after = { renderedRealityLog: [WILKINSON], ...clearRenderedRealityForLessonOpen() }
    const block = buildRenderedRealityBlock(readRRM(after))
    expect(block).toMatch(/No visual is currently displayed/)
    expect(block).not.toMatch(/Wilkinson/)
  })
  it('lesson-init writes the clear in the same delta as the visual-session clear', () => {
    const INIT = readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf8')
    expect(INIT).toMatch(/\.\.\.clearVisualSessionForNewClientView\(\),[\s\S]{0,200}\.\.\.clearRenderedRealityForLessonOpen\(\),/)
  })
})

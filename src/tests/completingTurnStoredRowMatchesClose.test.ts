/**
 * THE COMPLETING TURN'S STORED MESSAGE DISAGREED WITH WHAT WAS SHOWN.
 *
 * 2026-10-02 learner baseline (real account, chemistry States of Matter):
 * the completing tap showed "That's States of Matter finished — nice work…".
 * After a reload the same turn read as a different model reply PLUS a new
 * fill-in question ("The change directly from solid to gas… A) condensation…
 * D) sublimation"). The `messages` row held that undelivered text.
 *
 * 5095de4c (2026-08-02) replaced the completing turn's outgoing text with the
 * deterministic close. But the assistant row is written earlier in the turn
 * from `contentForHistory`, before completion is known. So that fix covered
 * the response and never the stored row, which is what a reload renders and
 * what the next turn's model reads as history.
 *
 * The finalising branch now rewrites that row to the close text.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const persistAt = ROUTE.indexOf("'chat-assistant-message'")
const closeAt = ROUTE.indexOf('cleanText = buildLessonCloseText(')

describe('the completing turn stores what it delivered', () => {
  it('the assistant row is written before completion is decided (why a rewrite is needed)', () => {
    expect(persistAt).toBeGreaterThan(-1)
    expect(closeAt).toBeGreaterThan(persistAt)
  })

  it('the finalising branch rewrites the stored row to the close text', () => {
    const branch = ROUTE.slice(closeAt, closeAt + 4000)
    const rewrite = branch.match(/prisma\.message\.update\(\{\s*where: \{ id: assistantMessage\.id \},\s*data: \{ content: cleanText \}/)
    expect(rewrite).not.toBeNull()
  })

  it('the rewrite cannot fail the turn', () => {
    const branch = ROUTE.slice(closeAt, closeAt + 4000)
    const at = branch.indexOf('prisma.message.update(')
    expect(branch.slice(Math.max(0, at - 300), at)).toMatch(/try \{/)
  })
})

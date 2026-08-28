/**
 * route.ts wiring for the RECOVERY-turn extension to the output floor.
 *
 * MEASURED (production, phys.qm.spin, 2026-08-28): "I don't understand this
 * at all" classifies as conversationDecision.type === 'RECOVERY' (recoveryGuard
 * detected 'dont_understand'), not CONFUSION — so `isRemediationTurn` (which
 * recognises only CONFUSION/REPHRASE_REQUEST) never counted it, and
 * checkRemediationOutput's own top gate returned OK before any check ran. The
 * reply was "Okay—let's come at it differently." — the script's acknowledgment
 * half only, with the mandatory "then CHANGE REPRESENTATION entirely" half
 * dropped — and nothing caught it.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROUTE = readFileSync(
  join(process.cwd(), 'src/app/api/learn/chat/route.ts'),
  'utf8',
)

describe('route.ts computes and threads recoveryTurn through both floor checks', () => {
  it('computes recoveryTurn from the same conversationDecisionHoisted the CONFUSION path already reads', () => {
    expect(ROUTE).toMatch(/const recoveryTurn = conversationDecisionHoisted\.type === 'RECOVERY'/)
  })

  it('passes it into the first verdict check', () => {
    const block = ROUTE.slice(
      ROUTE.indexOf('const verdict = checkRemediationOutput({'),
      ROUTE.indexOf('const verdict = checkRemediationOutput({') + 300,
    )
    expect(block).toContain('remediationTurn,')
    expect(block).toContain('recoveryTurn,')
  })

  it('passes it into the post-regeneration re-check too — both checks must agree on scope', () => {
    const block = ROUTE.slice(
      ROUTE.indexOf('const stillViolating = checkRemediationOutput({'),
      ROUTE.indexOf('const stillViolating = checkRemediationOutput({') + 300,
    )
    expect(block).toContain('remediationTurn, recoveryTurn,')
  })

  it('logs recoveryTurn alongside remediationTurn so production is diagnosable', () => {
    expect(ROUTE).toMatch(/console\.log\('\[remediation-floor\]', \{\s*\n\s*remediationTurn,\s*\n\s*recoveryTurn,/)
  })
})

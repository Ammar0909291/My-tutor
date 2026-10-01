/**
 * A SERVER-GRADED WRONG ANSWER KEEPS ITS CORRECTION THROUGH THE REMEDIATION FLOOR.
 *
 * ── THE MEASURED DEFECT (production QA, 2026-09-24) ─────────────────────────
 * phys.mech.projectile-motion. The learner picked the authored misconception
 * option "Both axes decelerate together since gravity acts on the whole
 * object"; the server graded it wrong against the authored key. The ENG-D11
 * correction ("Not quite — the answer is: …") was added — and then the
 * remediation floor, which runs later in route.ts and REPLACES `cleanText`
 * when it rejects a draft, served its fallback template instead:
 *
 *   "Let me put it in the simplest words I have. Projectile motion combines …
 *    Tell me which part of that is the fuzzy one, and I will go slower there."
 *
 * No verdict, no right answer. route.ts now re-applies the same idempotent
 * correction after the floor.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { stateCorrectionForWrongAnswer } from '@/lib/teaching/wrongAnswerCorrection'
import { buildRemediationFallbackText } from '@/lib/teaching/remediationOutputContract'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { PHYSICS_DEPTH_PROBES } from '@/lib/teaching/assets/physicsDepthSeedAssets'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'

const p = [...AUTHORED_PROBES, ...PHYSICS_DEPTH_PROBES]
  .find((x) => x.conceptId === 'phys.mech.projectile-motion' && x.stem.startsWith('DIAGNOSTIC (Prerequisite Diagnostic PD-1)'))!
const PROBE = { options: p.choices!.map((c) => c.text), correctIndex: p.choices!.findIndex((c) => c.isCorrect) }

describe('the production turn', () => {
  it('the fallback the floor served carries no verdict of its own', () => {
    const fallback = buildRemediationFallbackText(getKGNode('phys.mech.projectile-motion')?.description)
    expect(fallback).toMatch(/simplest words I have/)
    const r = stateCorrectionForWrongAnswer({ text: fallback!, correct: false, probe: PROBE })
    expect(r.added).toBe(true)
    expect(r.text.startsWith(`Not quite — the answer is: ${PROBE.options[PROBE.correctIndex]}`)).toBe(true)
    expect(r.text).toContain('simplest words I have')
  })

  it('re-applying on an already-corrected reply adds nothing (idempotent)', () => {
    const once = stateCorrectionForWrongAnswer({ text: 'Some teaching.', correct: false, probe: PROBE }).text
    const twice = stateCorrectionForWrongAnswer({ text: once, correct: false, probe: PROBE })
    expect(twice.added).toBe(false)
    expect(twice.text).toBe(once)
  })

  it('an ungraded or unauthored turn is untouched', () => {
    expect(stateCorrectionForWrongAnswer({ text: 'x', correct: null, probe: PROBE }).added).toBe(false)
  })
})

describe('route.ts ordering', () => {
  const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')
  // The floor's own fallback overwrite — the last place the floor replaces the reply.
  const lastFloorOverwrite = ROUTE.indexOf('if (choice.text) cleanText = choice.text')
  const historyRing = ROUTE.indexOf('// S1 — append this turn to the history ring, unconditionally')
  const corrections = [...ROUTE.matchAll(/stateCorrectionForWrongAnswer\(\{/g)].map((m) => m.index!)

  it('a correction runs AFTER the floor\'s last overwrite and BEFORE the history ring records the turn', () => {
    expect(lastFloorOverwrite).toBeGreaterThan(0)
    expect(historyRing).toBeGreaterThan(lastFloorOverwrite)
    expect(corrections.some((i) => i > lastFloorOverwrite && i < historyRing)).toBe(true)
  })

  it('it reads the authored-key-only verdict, never the raw grade', () => {
    const after = ROUTE.slice(lastFloorOverwrite, historyRing)
    expect(after).toMatch(/correct: correctForConfirmation,\s*probe: pendingMcqHoisted/)
  })
})

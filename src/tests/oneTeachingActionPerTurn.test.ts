/**
 * PRODUCTION SYMPTOM — multiple pedagogical actions survived into one AI turn:
 *
 *   Praise -> Explanation -> Worked Example -> Misconception -> Another
 *   Explanation -> MCQ -> Transition, all in ONE response.
 *
 * ROOT CAUSE — a second block spoke with decision authority alongside the
 * canonical TURN DIRECTIVE.
 *
 * dispatcher.ts's Milestone 6 contract: when the Brain runtime is ON, the
 * Brain's execution block is the prompt's SINGLE decision authority, and the
 * legacy decision blocks "are suppressed at their injection sites. Their
 * engines keep RUNNING ... they just no longer speak with decision authority
 * in the prompt."
 *
 * That suppression was applied to the TEACHING ENGINE DECISION block, the
 * LAST-ANSWER READ overlay, buildActionProcedureBlock and
 * buildTeachingActionBlock — but NOT to buildTeachingStrategyBlock. And of the
 * suppressed ones, buildTeachingActionBlock and buildLessonPlanBlock are now
 * stubs returning '', so ACTIVE TEACHING STRATEGY was the last LIVE competing
 * decision block in prompt assembly.
 *
 * These tests cover ONLY that. Misconception gating, visualization ownership,
 * lesson ownership/transition/completion and the first-lesson protocol are
 * covered by their own suites and are not retested here.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { buildTeachingStrategyBlock } from '@/lib/school/adaptive/teachingStrategy'
import { legacyDecisionBlocksSuppressed } from '@/lib/understanding/dispatcher'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const STRATEGY_SRC = readFileSync('src/lib/school/adaptive/teachingStrategy.ts', 'utf8')

/** Phrases that name a pedagogical ACTION rather than support one. */
const ACTION_PHRASES = [
  /worked example/i,
  /harder variant/i,
  /practice question/i,
  /analogy first/i,
  /explain their reasoning/i,
]

describe('the strategy block really did carry competing teaching actions', () => {
  it('its action directives name pedagogical actions, not support', () => {
    // Evidence, not assumption: read the directive table itself.
    const table = STRATEGY_SRC.slice(
      STRATEGY_SRC.indexOf('const STRATEGY_ACTION_DIRECTIVE'),
      STRATEGY_SRC.indexOf('}', STRATEGY_SRC.indexOf('const STRATEGY_ACTION_DIRECTIVE')),
    )
    const named = ACTION_PHRASES.filter((re) => re.test(table))
    expect(named.length).toBeGreaterThanOrEqual(4)
  })

  it('at least one directive orders TWO actions in a single line', () => {
    // ACCELERATED_GROWTH: "Challenge with a harder variant after explaining."
    expect(STRATEGY_SRC).toMatch(/harder variant after explaining/i)
  })

  it('the block asserts session-wide authority, not turn-scoped support', () => {
    const block = buildTeachingStrategyBlock({
      type: 'ACCELERATED_GROWTH', priority: 7, reason: 'r', tutorInstructions: ['a', 'b'],
    } as never)
    expect(block).toContain('Action directive:')
    expect(block).toContain('Apply this strategy throughout the session')
    // Plural instructions in one block — several objectives at once.
    expect(block.match(/^- /gm)?.length ?? 0).toBeGreaterThan(1)
  })
})

describe('exactly one block speaks with decision authority', () => {
  it('the strategy block is subordinate to the Brain/turn directive', () => {
    expect(ROUTE).toMatch(/if \(!_legacySuppressed\(\)\) \{\s*\n\s*systemPrompt \+= buildTeachingStrategyBlock\(teachingStrategy\)/)
  })

  it('it uses the EXISTING suppression mechanism, not a new one', () => {
    expect(ROUTE).toContain("legacyDecisionBlocksSuppressed: _legacySuppressed")
    expect(typeof legacyDecisionBlocksSuppressed()).toBe('boolean')
  })

  it('no live builder still injects the strategy block unconditionally', () => {
    const hits = ROUTE.match(/systemPrompt \+= buildTeachingStrategyBlock\(/g) ?? []
    expect(hits.length).toBe(1) // the one, now-gated, site
  })

  it('the other legacy decision blocks remain suppressed (no regression)', () => {
    // TEACHING ENGINE DECISION + action procedure + teaching action block.
    expect(ROUTE).toContain('const brainOwnsDecisionBlocks = legacyDecisionBlocksSuppressed()')
    expect(ROUTE).toMatch(/if \(!brainOwnsDecisionBlocks\) \{[\s\S]{0,4000}?TEACHING ENGINE DECISION/)
    expect(ROUTE).toMatch(/if \(!brainOwnsDecisionBlocks\) \{\s*\n\s*systemPrompt \+= buildTeachingActionBlock/)
  })
})

describe('the strategy ENGINE keeps running — only its prompt voice is gone', () => {
  it('strategyHoisted is still assigned from the computed strategy', () => {
    expect(ROUTE).toContain('strategyHoisted = teachingStrategy.type')
  })

  it('output and hint bias still derive from it', () => {
    expect(ROUTE).toContain('outputBiasHoisted = deriveOutputBias(teachingStrategy.type)')
    expect(ROUTE).toContain('hintBiasHoisted = deriveHintBias(teachingStrategy.type)')
  })

  it('the strategy is still computed before the gate, never skipped', () => {
    const compute = ROUTE.indexOf('const teachingStrategy = await getTeachingStrategy(')
    const gate = ROUTE.indexOf('if (!_legacySuppressed())')
    expect(compute).toBeGreaterThan(-1)
    expect(gate).toBeGreaterThan(compute)
  })

  it('the builder itself is untouched — suppression is at the injection site', () => {
    // The Milestone 6 contract suppresses at injection sites, so the builder
    // must still produce its full block when called (flag OFF path).
    const block = buildTeachingStrategyBlock({
      type: 'FOUNDATION_REBUILD', priority: 1, reason: 'r', tutorInstructions: ['x'],
    } as never)
    expect(block).toContain('ACTIVE TEACHING STRATEGY')
    expect(block.length).toBeGreaterThan(0)
  })
})

/**
 * A lesson opening must open the lesson.
 *
 * Measured against production 2026-08-23: twelve openings across four lessons
 * and three subjects, ELEVEN opened correctly and ONE returned
 * "Use the lesson navigation panel at the top to switch lessons." as the
 * entire turn — a learner's first contact with a lesson answered by a refusal
 * to teach it, right after they navigated to it.
 *
 * Two independent guards, tested independently:
 *   1. the instruction no longer contains the NAVIGATION RULE's own trigger
 *      phrase (root cause — the endpoint was tripping its own guard)
 *   2. a narrow backstop that re-asks once when a refusal is served anyway
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { isNavigationRefusalOpening } from '@/lib/ai/client'

const ROUTE = readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf8')

describe('a lesson opening must open the lesson', () => {
  it('detects the refusal when it is the whole turn', () => {
    expect(isNavigationRefusalOpening('Use the lesson navigation panel at the top to switch lessons.')).toBe(true)
    // The exact production capture, with the markdown the model tends to add.
    expect(isNavigationRefusalOpening('**Use the lesson navigation panel at the top to switch lessons.**')).toBe(true)
  })

  it('leaves a real opening alone, even one that mentions the panel', () => {
    const realOpening =
      '**Welcome to Lesson 408: Critical Points** In this lesson we will learn how to spot the '
      + 'points on a graph where the slope is zero or undefined, and use them to find peaks and '
      + 'valleys. By the end you will be able to locate them on any curve. When you are finished, '
      + 'use the lesson navigation panel at the top to switch lessons.'
    expect(isNavigationRefusalOpening(realOpening)).toBe(false)
    expect(isNavigationRefusalOpening('**Lesson 39 – Angular Kinematics** In this lesson we will explore rotation.')).toBe(false)
    expect(isNavigationRefusalOpening('')).toBe(false)
  })

  it('the restart instruction no longer carries the NAVIGATION RULE trigger phrase', () => {
    const fn = ROUTE.slice(ROUTE.indexOf('function buildInstruction'))
    expect(fn).not.toMatch(/restart lesson "/i)
    expect(fn).toContain('Open lesson "${lessonTitle}" now and teach it from the beginning.')
  })

  it('the route re-asks once rather than serving a refusal', () => {
    expect(ROUTE).toContain('isNavigationRefusalOpening(routed.text)')
    // The retry must be able to REPLACE the answer, and only with a non-refusal.
    expect(ROUTE).toContain('if (!isNavigationRefusalOpening(retry.text)) routed = retry')
    // A failed retry must not lose the turn.
    expect(ROUTE).toMatch(/catch \(retryError\)/)
  })
})

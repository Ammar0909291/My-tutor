/**
 * PHYS-001 / PHYS-008 (2026-10-05, physics real-learner run, phys.opt.youngs-experiment).
 *
 * PHYS-001: "i dont understand this picture. what is the picture showing?"
 * named the "topic" "picture showing" (`picture` is a medium word, `showing`
 * was not, so ONE word survived). A knowledge-gap excursion opened on it; the
 * tutor taught what a picture is, and the excursion was still open when the
 * learner answered the next confirm-back with "yes" — three turns on pictures
 * before the learner dragged the lesson back.
 *
 * PHYS-008: "…i already said this before…" (an objection to being re-asked)
 * was answered "I'm sorry you're feeling stuck".
 */
import { describe, it, expect } from 'vitest'
import { namedTopicUnknownTo } from '@/lib/teaching/visual/requestedTopic'
import { buildRecoveryBlock, detectFailureState } from '@/lib/teaching/recoveryGuard'

const TAUGHT = 'Light through two slits makes bright and dark fringes on the screen; path difference decides which.'

describe('PHYS-001: a question about what a figure shows names no topic', () => {
  it('the persona messages open no excursion', () => {
    for (const m of [
      'i dont understand this picture. what is the picture showing?',
      'i dont understand this picture. what is it showing?',
      'what does this graph mean?',
      'what is the diagram showing',
    ]) expect(namedTopicUnknownTo(m, TAUGHT), m).toBeNull()
  })
  it('a real unknown topic still does', () => {
    expect(namedTopicUnknownTo('what is diffraction?', TAUGHT)?.title).toBe('diffraction')
    expect(namedTopicUnknownTo('what is the meaning of entropy?', TAUGHT)?.title).toContain('entropy')
  })
})

describe('PHYS-008: an objection to being re-asked is not "stuck"', () => {
  it('stays frustrated, and the script forbids calling them stuck and takes their answer', () => {
    const m = 'the bright peaks are equal distance. i already said this before. the middle one is the biggest'
    expect(detectFailureState(m)).toBe('frustrated')
    const b = buildRecoveryBlock('frustrated', false, 0, false)
    expect(b).toMatch(/they are not stuck/)
    expect(b).toMatch(/Take the answer they gave/)
  })
})

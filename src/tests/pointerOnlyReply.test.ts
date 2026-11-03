/**
 * A reply that is ONLY the appended figure pointer is blank (production, 2026-11-03): phys.wave.wave-speed and eng.grammar.compound-sentences both answered
 * "Okay, I follow. Please continue." with "Take a look at the labelled figure beside this message — it shows … Follow it step by step." and nothing else.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { splitVisualPointer } from '@/lib/teaching/visual/visualAcknowledgement'

describe('a pointer-only reply is recognised as blank', () => {
  it.each([
    'Take a look at the labelled figure beside this message — it shows Wave speed depends on the medium. Follow it step by step.',
    'Take a look at the labelled figure beside this message — it shows Constructing a Compound Sentence. Study it while I explain.',
  ])('%s', (t) => {
    const s = splitVisualPointer(t)
    expect(s.pointer.length).toBeGreaterThan(0)
    expect(s.body.trim()).toBe('')
  })
  it('a pointer after real teaching is not blank', () => {
    const s = splitVisualPointer('Wave speed depends on the medium.\n\nTake a look at the labelled figure beside this message — it shows Wave speed. Follow it step by step.')
    expect(s.body.trim().length).toBeGreaterThan(10)
  })
  it('the final safety net replaces such a reply: fallback in front of the pointer, before the provenance log', () => {
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    const i = route.indexOf('const blankButForPointer')
    expect(i).toBeGreaterThan(0)
    expect(route.slice(i, i + 700)).toMatch(/\(!cleanText\.trim\(\) \|\| blankButForPointer\) && !servedMcq/)
    expect(route.slice(i, i + 1500)).toMatch(/`\$\{fallbackBody\}\\n\\n\$\{pointerOnly\.pointer\}`/)
    expect(route.indexOf('// ── PHASE 0: TURN DECISION PROVENANCE')).toBeGreaterThan(i)
  })
})

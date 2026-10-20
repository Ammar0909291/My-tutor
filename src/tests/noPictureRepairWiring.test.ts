/**
 * The no-picture repair (visual/noPictureRepair.ts) is wired into the chat route through the EXISTING stub-repair call site, under exactly the
 * conditions of the "I don't have a picture" acknowledgement, and before it. Source-level pins (the route cannot be run offline), in the same style
 * as the other route wiring tests: they fail if the repair loses a condition, gets its own provider call, or runs after the acknowledgement.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const block = route.slice(route.indexOf('// A PICTURE REQUEST THAT CANNOT BE MET STILL GETS AN EXPLANATION'), route.indexOf('// AN UNMET PICTURE REQUEST IS SAID OUT LOUD'))

describe('no-picture repair wiring (chat route)', () => {
  it('exists and sits BEFORE the acknowledgement it complements', () => {
    expect(block.length).toBeGreaterThan(500)
    expect(route.indexOf('A PICTURE REQUEST THAT CANNOT BE MET')).toBeLessThan(route.indexOf('AN UNMET PICTURE REQUEST IS SAID OUT LOUD'))
  })
  it('first sweeps the FINAL text with the ASCII-art and phantom-figure strips (a late regeneration writes the reply after the earlier strips ran), only when no figure is attached, and never to an empty reply', () => {
    expect(block).toMatch(/THE LAST SWEEP/)
    expect(block).toMatch(/if \(!attachedNow\) \{[\s\S]*sweepPhantom\(sweepAscii\(cleanText, false\)\.text\)/)
    expect(block).toMatch(/swept\.trim\(\)\.length > 0/)
    expect(block.indexOf('THE LAST SWEEP')).toBeLessThan(block.indexOf("learnerRequestHoisted === 'diagram'"))
  })
  it('runs only for an explicit diagram request with no figure attached, none shown earlier for the concept, no card served and the lesson not complete', () => {
    expect(block).toMatch(/learnerRequestHoisted === 'diagram'/)
    expect(block).toMatch(/!attachedNow/)
    expect(block).toMatch(/!shownEarlierForConcept/)
    expect(block).toMatch(/!servedMcq/)
    expect(block).toMatch(/!serveLessonComplete/)
  })
  it('judges the reply with pictureReplyIsNotAnExplanation first and keeps the retry only through acceptNoPictureRepair', () => {
    expect(block).toMatch(/pictureReplyIsNotAnExplanation\(cleanText\)/)
    expect(block).toMatch(/judgeNoPictureRepair\(/)
    expect(block).toMatch(/stripUnbackedAsciiDiagram\(retry, false\)/)
  })
  it('adds NO provider call: it goes through repairStubReply, whose routeAI call site is the only one it uses', () => {
    expect(block).not.toMatch(/routeAI\(/)
    expect(block).toMatch(/repairStubReply\(cleanText, 'no-picture'/)
    expect(block).toMatch(/buildNoPictureSecondAttemptAppendix\(\)/)       // a second, stricter attempt, through the same call site
    const fn = route.slice(route.indexOf('const repairStubReply = async ('), route.indexOf('// ── THE CONFIRM-BACK, WHEREVER IT SITS'))
    expect(fn.match(/routeAI\(/g)).toHaveLength(1)
    expect(fn).toMatch(/override\.appendix/)
    expect(fn).toMatch(/override\.accept\(/)
  })
  it('a failed or refused repair leaves the reply exactly as it was (never throws into the turn)', () => {
    expect(block).toMatch(/if \(acceptedNp\) cleanText = acceptedNp/)
    expect(block).toMatch(/catch \(npErr\)/)
  })
})

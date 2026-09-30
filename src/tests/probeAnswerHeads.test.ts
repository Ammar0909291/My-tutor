/**
 * Task #2, the LENGTH GIVEAWAY (2026-09-30).
 *
 * Authored choices carried their own working on the correct option only
 * ("Four — l can be 0 or 1 …" against "Three"), so the correct option was the
 * uniquely longest on ~80% of items and "pick the longest" beat chance two to
 * three times over. `probeToMcq` now serves the answer HEAD and keeps the
 * working in `rationales`, handed over only after grading. These tests pin the
 * split rule, that grading is untouched (every tap and every full-text answer
 * still lands on its own option, corpus-wide), that the working survives the
 * turn boundary and reaches the verdict, and the measured drop in the cue.
 */
import { describe, it, expect, beforeAll } from 'vitest'
import { readdirSync } from 'fs'
import path from 'path'
import { probeToMcq, splitAnswerHeads } from '@/lib/teaching/gateAssessment'
import { resolveMcqChoice, mcqForClient, type TutorMCQ } from '@/lib/teaching/mcq'
import { readPendingQuestion, writePendingQuestion } from '@/lib/teaching/pendingQuestion'
import { buildAnswerVerdictBlock } from '@/lib/teaching/answerVerdictBlock'
import { stateCorrectionForWrongAnswer } from '@/lib/teaching/wrongAnswerCorrection'

type Probe = { conceptId: string; subjectSlug: string; stem: string; choices?: { text: string; isCorrect?: boolean }[] }

const HYDROGEN = {
  stem: 'Ignoring spin, how many distinct quantum states does the hydrogen level n = 2 have?',
  choices: [
    { text: 'Four — l can be 0 or 1. The 2s subshell contributes 1 state and 2p contributes 3.', isCorrect: true },
    { text: 'Three — one for each p orbital, m = −1, 0, +1', isCorrect: false },
  ],
}

describe('splitAnswerHeads — splits only when it is unambiguous', () => {
  it('splits every option on a spaced em or en dash', () => {
    expect(splitAnswerHeads(['Mixture — boil off the water', 'Compound – they combined'])).toEqual({
      heads: ['Mixture', 'Compound'], rationales: ['boil off the water', 'they combined'],
    })
  })

  it('refuses when any option lacks the shape, heads collide, a head is a bare letter, or only a hyphen separates', () => {
    expect(splitAnswerHeads(['Yes — because A', 'No'])).toBeNull()
    expect(splitAnswerHeads(['Yes — because A', 'yes — because B'])).toBeNull()
    expect(splitAnswerHeads(['A — the left block', 'B — the right block'])).toBeNull()
    expect(splitAnswerHeads(['x - 2', 'x - 3'])).toBeNull()
  })
})

describe('probeToMcq serves heads and keeps the working aligned', () => {
  it('options are heads, the key still points at the right one, rationales follow the shown order', () => {
    const m = probeToMcq(HYDROGEN as never)!
    expect(m.options.sort()).toEqual(['Four', 'Three'].sort())
    const shown = probeToMcq(HYDROGEN as never)!
    expect(shown.options[shown.correctIndex]).toBe('Four')
    expect(shown.rationales![shown.correctIndex]).toMatch(/^l can be 0 or 1/)
    expect(shown.rationales![1 - shown.correctIndex]).toMatch(/^one for each p orbital/)
  })

  it('the working never goes to the client while the question is open', () => {
    const client = mcqForClient(probeToMcq(HYDROGEN as never)) as Record<string, unknown>
    expect(client).not.toHaveProperty('rationales')
    expect(JSON.stringify(client)).not.toContain('l can be 0 or 1')
  })

  it('an item without the shape is served exactly as before, with no rationales', () => {
    const m = probeToMcq({ stem: 'Pick one', choices: [{ text: 'Alpha', isCorrect: true }, { text: 'Beta' }] } as never)!
    expect(m.options.sort()).toEqual(['Alpha', 'Beta'])
    expect(m).not.toHaveProperty('rationales')
  })
})

describe('corpus-wide: grading is untouched and the cue drops', () => {
  const probes: Probe[] = []
  beforeAll(async () => {
    const dir = path.resolve(__dirname, '../lib/teaching/assets')
    for (const f of readdirSync(dir).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))) {
      const mod = await import(path.join(dir, f))
      for (const [name, value] of Object.entries(mod)) if (Array.isArray(value) && name.endsWith('PROBES')) probes.push(...(value as Probe[]))
    }
  }, 60_000)

  it('every tap on a head, and every original full-text answer, grades to its own option', () => {
    let split = 0
    const wrong: string[] = []
    for (const p of probes) {
      const m = probeToMcq(p as never)
      if (!m?.rationales) continue
      split++
      m.options.forEach((o, i) => {
        if (resolveMcqChoice(o, m) !== i) wrong.push(`${p.conceptId} tap "${o}"`)
        if (resolveMcqChoice(`${o} — ${m.rationales![i]}`, m) !== i) wrong.push(`${p.conceptId} full "${o} — …"`)
      })
    }
    expect(split).toBeGreaterThan(2000)
    expect(wrong).toEqual([])
  }, 60_000)

  it('the correct option is far less often the uniquely longest one (measured 2026-09-30)', () => {
    const by: Record<string, { n: number; longest: number }> = {}
    for (const p of probes) {
      const m = probeToMcq(p as never)
      if (!m) continue
      const L = m.options.map((o) => o.length), max = Math.max(...L)
      const s = (by[p.subjectSlug] ??= { n: 0, longest: 0 })
      s.n++
      if (L[m.correctIndex] === max && L.filter((l) => l === max).length === 1) s.longest++
    }
    const rate = (k: string) => by[k].longest / by[k].n
    // Before: english 96%, chemistry 79%, physics 81%, biology 79%, cs 78%.
    expect(rate('english')).toBeLessThan(0.25)
    expect(rate('chemistry')).toBeLessThan(0.5)
    expect(rate('physics')).toBeLessThan(0.6)
    expect(rate('biology')).toBeLessThan(0.6)
    expect(rate('computer_science')).toBeLessThan(0.55)
  }, 60_000)
})

describe('the working survives the turn boundary and reaches the verdict', () => {
  const m = probeToMcq(HYDROGEN as never) as TutorMCQ
  const wrongIndex = 1 - m.correctIndex

  it('write → read round-trips the rationales; a malformed value is dropped, not trusted', () => {
    const back = readPendingQuestion(JSON.parse(JSON.stringify(writePendingQuestion(m, 'lesson'))), 'lesson')!
    expect(back.rationales).toEqual(m.rationales)
    const broken = readPendingQuestion({ ...writePendingQuestion(m, 'lesson'), rationales: ['only one'] }, 'lesson')!
    expect(broken).not.toHaveProperty('rationales')
    expect(broken.correctIndex).toBe(m.correctIndex)
  })

  it('a wrong answer: the verdict names the thinking behind the choice and the authored reason', () => {
    const block = buildAnswerVerdictBlock({ grade: { chosenIndex: wrongIndex, correct: false }, mcq: m, keyIsAuthored: true })
    expect(block).toContain('The thinking behind that choice: "one for each p orbital')
    expect(block).toContain('The authored reason it is right: "l can be 0 or 1')
  })

  it('a right answer: the verdict carries the authored reason', () => {
    const block = buildAnswerVerdictBlock({ grade: { chosenIndex: m.correctIndex, correct: true }, mcq: m, keyIsAuthored: true })
    expect(block).toContain('The authored reason it is right: "l can be 0 or 1')
  })

  it('the stated correction is never bare: it carries the authored working', () => {
    const r = stateCorrectionForWrongAnswer({ text: 'Let us look again.', correct: false, probe: m })
    expect(r.text).toMatch(/^Not quite — the answer is: Four — l can be 0 or 1/)
  })
})

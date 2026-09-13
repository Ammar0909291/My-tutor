/**
 * INTERNAL STRUCTURED PAYLOADS MUST NEVER REACH THE LEARNER.
 *
 * ── MEASURED (real-student session, 2026-09, live production account,
 *    provider=groq) ────────────────────────────────────────────────────────
 * Two distinct malformed-MCQ shapes reached the learner as unreadable
 * content in the same session:
 *
 *  1. RAW JSON LEAKAGE — the model emitted a `{"tag":"MCQ", ...}` JSON
 *     object instead of the required `<!--MCQ ...-->` tag. It did not match
 *     the tag regex at all, so it was never stripped and the learner saw
 *     the literal JSON text on screen.
 *  2. LETTER-ONLY OPTIONS — a syntactically valid `<!--MCQ-->` tag whose
 *     option attributes were degenerate placeholders (`a="A" b="B" ...`),
 *     while the real option text was written separately as prose. The
 *     rendered widget showed four buttons reading "A", "B", "C", "D" with
 *     no actual content.
 *
 * `groqToolUseSalvage.test.ts` already documents this same provider
 * drifting into JSON/tool-call shapes under a DIFFERENT trigger (a
 * rejected tool-call error); this is the sibling case — a SUCCESSFUL
 * response whose own content is malformed.
 */
import { describe, it, expect } from 'vitest'
import { parseMcqTag } from '@/lib/teaching/mcq'

describe('raw JSON MCQ payloads never reach the learner', () => {
  it('the exact measured production leak: parsed into a real, gradeable MCQ, and stripped from view', () => {
    const text =
      'ok great, i think i good with idioms now. thank you tutor\n\n'
      + '{"tag":"MCQ","question":"Which of the following sentences is a **second conditional**?",'
      + '"options":{"a":"If it rains tomorrow, I will stay at home.","b":"If I were a bird, I would fly.",'
      + '"c":"If you heat water, it boils.","d":"If he finished the work, he will get a bonus."},"correct":"b"}'
    const r = parseMcqTag(text)
    expect(r.cleanText).not.toContain('{"tag"')
    expect(r.cleanText).not.toContain('"question":')
    expect(r.cleanText).toBe('ok great, i think i good with idioms now. thank you tutor')
    expect(r.mcq).not.toBeNull()
    expect(r.mcq!.question).toBe('Which of the following sentences is a **second conditional**?')
    expect(r.mcq!.options).toHaveLength(4)
    expect(r.mcq!.options[r.mcq!.correctIndex]).toBe('If I were a bird, I would fly.')
  })

  it('a malformed JSON payload (bad correct key) is discarded but STILL removed from view', () => {
    const text = 'Some teaching. {"tag":"MCQ","question":"Q?","options":{"a":"A opt","b":"B opt"},"correct":"z"} more.'
    const r = parseMcqTag(text)
    expect(r.mcq).toBeNull()
    expect(r.cleanText).not.toContain('{"tag"')
    expect(r.cleanText).toContain('Some teaching.')
    expect(r.cleanText).toContain('more.')
  })

  it('a JSON payload with only one usable option is discarded and stripped', () => {
    const text = '{"tag":"MCQ","question":"Q?","options":{"a":"Only one"},"correct":"a"}'
    const r = parseMcqTag(text)
    expect(r.mcq).toBeNull()
    expect(r.cleanText).toBe('')
  })

  it('a JSON payload with degenerate letter-only option text is discarded', () => {
    const text = '{"tag":"MCQ","question":"Q?","options":{"a":"A","b":"B."},"correct":"a"}'
    const r = parseMcqTag(text)
    expect(r.mcq).toBeNull()
  })

  it('an options ARRAY shape (defensive, not yet measured) also parses correctly', () => {
    const text = '{"tag":"MCQ","question":"Which is correct?","options":["First real option","Second real option"],"correct":"b"}'
    const r = parseMcqTag(text)
    expect(r.mcq).not.toBeNull()
    expect(r.mcq!.options).toEqual(['First real option', 'Second real option'])
    expect(r.mcq!.correctIndex).toBe(1)
  })

  it('unterminated JSON (truncated mid-generation) is left alone rather than guessed at', () => {
    const text = 'Teaching text. {"tag":"MCQ","question":"Q?","options":{"a":"opt'
    const r = parseMcqTag(text)
    expect(r.mcq).toBeNull()
    // No balanced closing brace was found, so nothing is claimed to have
    // been extracted — the text is returned exactly as the primary parser
    // would have left it (stripMcqTags is a no-op here; no <!--MCQ--> tag).
    expect(r.cleanText).toContain('{"tag":"MCQ"')
  })

  it('a brace inside quoted option text does not break the balanced-brace scan', () => {
    const text = '{"tag":"MCQ","question":"What does { mean in code?","options":{"a":"a block","b":"a set"},"correct":"a"}'
    const r = parseMcqTag(text)
    expect(r.mcq).not.toBeNull()
    expect(r.mcq!.question).toBe('What does { mean in code?')
  })
})

describe('an MCQ whose visible options are missing or degenerate is never rendered', () => {
  it('the exact measured production shape: letter-only attribute values are discarded, prose survives', () => {
    const text = 'Which sentence correctly uses an idiom?\n\n'
      + 'A) "She hit the books every night to finish her homework."\n'
      + 'B) "After the accident, the police hit the books to investigate."\n\n'
      + '<!--MCQ q="Which sentence correctly uses an idiom?" a="A" b="B" correct="a"-->'
    const r = parseMcqTag(text)
    expect(r.mcq).toBeNull()
    expect(r.cleanText).toContain('She hit the books every night')
    expect(r.cleanText).not.toContain('<!--MCQ')
  })

  it('"a)" / "B." style degenerate values are also caught, not just bare letters', () => {
    const text = '<!--MCQ q="Pick one" a="a)" b="B." correct="a"-->'
    const r = parseMcqTag(text)
    expect(r.mcq).toBeNull()
  })

  it('a genuine option that happens to START with a letter-like word is NOT falsely rejected', () => {
    const text = '<!--MCQ q="Which is a vowel?" a="A is a vowel" b="B is a consonant" correct="a"-->'
    const r = parseMcqTag(text)
    expect(r.mcq).not.toBeNull()
    expect(r.mcq!.options[0]).toBe('A is a vowel')
  })

  it('a normal, well-formed MCQ tag is completely unaffected', () => {
    const text = '<!--MCQ q="What is 1/2 + 1/4?" a="1/4" b="3/4" c="2/6" d="1/6" correct="B"-->'
    const r = parseMcqTag(text)
    expect(r.mcq).not.toBeNull()
    expect(r.mcq!.options).toEqual(['1/4', '3/4', '2/6', '1/6'])
    expect(r.mcq!.correctIndex).toBe(1)
    expect(r.cleanText).toBe('')
  })
})

describe('a repair may never break a turn', () => {
  it('ordinary text with no MCQ shape at all is untouched', () => {
    const text = 'Just a normal teaching paragraph with no tag or JSON in it.'
    const r = parseMcqTag(text)
    expect(r.mcq).toBeNull()
    expect(r.cleanText).toBe(text)
  })

  it('malformed input never throws', () => {
    expect(() => parseMcqTag(null as unknown as string)).not.toThrow()
    expect(() => parseMcqTag(undefined as unknown as string)).not.toThrow()
    expect(() => parseMcqTag('{"tag":"mcq"')).not.toThrow()
  })
})

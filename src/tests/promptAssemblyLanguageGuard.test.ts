import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { buildOutputLanguageBlock } from '@/lib/teaching/outputLanguage'
import { buildTutorSystemPrompt } from '@/lib/ai/client'
import { buildFirstLessonBlock, buildFirstLessonCloseBlock } from '@/lib/teaching/firstLessonGuard'
import { buildRecoveryBlock } from '@/lib/teaching/recoveryGuard'
import { buildViolationAppendix } from '@/lib/kernel/verifier/verifier'

/**
 * END-TO-END PROMPT ASSEMBLY GUARD — protects the output-language contract
 * from being silently buried again by future prompt additions.
 *
 * WHY THIS IS A SOURCE-LEVEL TEST AND NOT A RUNTIME ONE.
 *
 * The obvious design — assemble a prompt in the test and assert the language
 * block is last — cannot work as a regression guard, and it is worth stating
 * why so nobody "improves" it into that shape later. Such a test asserts the
 * ordering THE TEST ITSELF wrote. If a future change appends a block after
 * the language contract in route.ts, a self-assembled test keeps passing: it
 * never read route.ts. It would be a tautology wearing the costume of a guard.
 *
 * The ordering invariant lives in route.ts's assembly sequence, so that is
 * what has to be read. Part 1 reads the real route source and asserts the
 * language block is the final append; Part 2 asserts the block's own content
 * per language, using the real builders that precede it in production.
 *
 * This pairing is what makes the four required failure modes detectable:
 *   1. a future block appended after the contract  -> Part 1 (append order)
 *   2. the final language block removed            -> Part 1 (presence)
 *   3. another "highest priority" block after it   -> Part 1 (order + dominance)
 *   4. assembly order weakened generally           -> Part 1 (both call sites)
 */

const ROUTE_PATH = join(process.cwd(), 'src/app/api/learn/chat/route.ts')
const routeSource = readFileSync(ROUTE_PATH, 'utf8')

/** Every `systemPrompt +=` append site, in source order. */
function appendSitesInOrder(): { line: number; text: string }[] {
  return routeSource
    .split('\n')
    .map((text, i) => ({ line: i + 1, text }))
    .filter(({ text }) => /systemPrompt\s*\+=/.test(text))
}

describe('prompt assembly — the language contract is the final instruction', () => {
  it('has a language block wired into the chat route at all', () => {
    // Failure mode 2: someone deletes the final language block.
    expect(routeSource).toMatch(/buildOutputLanguageBlock/)
    expect(appendSitesInOrder().length).toBeGreaterThan(20)
  })

  it('appends the language block LAST of every systemPrompt append', () => {
    // Failure modes 1, 3 and 4: any block appended after the contract — a new
    // teaching block, or another "overrides everything above" instruction —
    // moves this assertion off the language block and fails here.
    const sites = appendSitesInOrder()
    const last = sites[sites.length - 1]
    expect(
      /outputLanguageBlockHoisted|buildOutputLanguageBlock/.test(last.text),
      `The last "systemPrompt +=" in route.ts is line ${last.line}:\n` +
        `    ${last.text.trim()}\n` +
        `but it must be the output-language block. A block appended after the ` +
        `language contract re-buries it — that is the exact production defect ` +
        `this guard exists to prevent (Russian learners receiving English ` +
        `turns). Move your new block ABOVE the OUTPUT LANGUAGE append.`,
    ).toBe(true)
  })

  it('re-appends the contract after the verifier violation appendix', () => {
    // The repair path builds its prompt by concatenation, not `+=`, so it is
    // invisible to the check above — this is the gap that shipped in the
    // first version of this fix and was caught while writing this guard.
    // A verifier re-render must still end with the language contract.
    expect(routeSource).toMatch(
      /systemPrompt \+ violationAppendix \+ outputLanguageBlockHoisted/,
    )
  })

  it('never appends the language block before the two override-claiming blocks', () => {
    // Failure mode 4, ordering direction: FIRST LESSON and RECOVERY both
    // assert supremacy over "everything above", so the contract must come
    // after both, not before.
    const idxLanguage = routeSource.indexOf('buildOutputLanguageBlock')
    const idxFirstLesson = routeSource.indexOf('systemPrompt += buildFirstLessonBlock')
    const idxRecovery = routeSource.indexOf('systemPrompt += buildRecoveryBlock')
    expect(idxFirstLesson).toBeGreaterThan(-1)
    expect(idxRecovery).toBeGreaterThan(-1)
    expect(idxLanguage).toBeGreaterThan(idxFirstLesson)
    expect(idxLanguage).toBeGreaterThan(idxRecovery)
  })
})

/**
 * Part 2 — the assembled tail, per language. Uses the REAL builders that
 * precede the language block in production (base prompt, first-lesson
 * protocol, recovery, verifier appendix) so the block is asserted in the
 * adversarial context it actually has to survive, not in isolation.
 */
function assembleTail(lang: 'en' | 'ru' | 'hi', opts: { repair?: boolean } = {}) {
  // ASCII student name on purpose: the learner's name is DATA interpolated
  // into the prompt, not an instruction, and a Cyrillic one would make the
  // "no non-English instruction" assertion below fail for a reason that has
  // nothing to do with the guarantee under test.
  let prompt = buildTutorSystemPrompt(
    'Physics', 'Ivan', 'beginner', 'learn physics', null, lang, null, undefined, 'beginner',
  )
  // The worst case: both blocks that claim to override everything above.
  prompt += buildFirstLessonBlock('physics')
  prompt += buildFirstLessonCloseBlock()
  prompt += buildRecoveryBlock('dont_know', true, 0)
  const languageBlock = buildOutputLanguageBlock(lang)
  prompt += languageBlock
  if (opts.repair) {
    prompt +=
      buildViolationAppendix([
        { code: 'V-TEST', severity: 'REJECT', detail: 'test violation' } as never,
      ]) + languageBlock
  }
  return { prompt, languageBlock }
}

describe('assembled prompt tail — Russian', () => {
  it('ends with the Russian language contract, after every override block', () => {
    const { prompt, languageBlock } = assembleTail('ru')
    expect(languageBlock).not.toBe('')
    expect(prompt.endsWith(languageBlock)).toBe(true)
  })

  it('places the contract after both blocks that claim to override everything above', () => {
    const { prompt } = assembleTail('ru')
    expect(prompt.indexOf('ЯЗЫК ОТВЕТА')).toBeGreaterThan(
      prompt.indexOf('OVERRIDES ANY CONFLICTING GUIDANCE ABOVE'),
    )
    expect(prompt.indexOf('ЯЗЫК ОТВЕТА')).toBeGreaterThan(
      prompt.indexOf('PREEMPTS EVERYTHING ABOVE'),
    )
  })

  it('no later block overrides it — nothing follows the contract', () => {
    const { prompt, languageBlock } = assembleTail('ru')
    expect(prompt.slice(prompt.indexOf(languageBlock) + languageBlock.length)).toBe('')
  })

  it('still ends with the contract on a verifier repair turn', () => {
    const { prompt, languageBlock } = assembleTail('ru', { repair: true })
    expect(prompt).toMatch(/VERIFICATION VIOLATIONS/)
    expect(prompt.endsWith(languageBlock)).toBe(true)
    expect(prompt.lastIndexOf('ЯЗЫК ОТВЕТА')).toBeGreaterThan(
      prompt.indexOf('VERIFICATION VIOLATIONS'),
    )
  })
})

describe('assembled prompt tail — Hindi', () => {
  it('ends with the Hindi language contract, after every override block', () => {
    const { prompt, languageBlock } = assembleTail('hi')
    expect(languageBlock).not.toBe('')
    expect(prompt.endsWith(languageBlock)).toBe(true)
  })

  it('no later block overrides it — nothing follows the contract', () => {
    const { prompt, languageBlock } = assembleTail('hi')
    expect(prompt.slice(prompt.indexOf(languageBlock) + languageBlock.length)).toBe('')
    expect(prompt).toMatch(/OUTRANKS EVERY INSTRUCTION ABOVE/)
  })

  it('preserves the existing technical-terms-remain-English behavior', () => {
    const { prompt, languageBlock } = assembleTail('hi')
    // Contract-level guarantee, in the final block…
    expect(languageBlock).toMatch(/Technical terms English mein rakhein/)
    expect(languageBlock).toMatch(/variable, function, loop/)
    // …and the pre-existing base-prompt rule it must not contradict.
    expect(prompt).toMatch(/Technical terms English में रखें/)
  })

  it('still ends with the contract on a verifier repair turn', () => {
    const { prompt, languageBlock } = assembleTail('hi', { repair: true })
    expect(prompt.endsWith(languageBlock)).toBe(true)
  })
})

describe('assembled prompt tail — English', () => {
  /**
   * DELIBERATE ASYMMETRY, recorded so it is not mistaken for an oversight.
   *
   * buildOutputLanguageBlock('en') returns '' by design: the defect being
   * guarded against is English REGISTER DRIFT caused by ~60 English
   * instruction blocks overwhelming a non-English contract. For an English
   * learner every block is already English, so there is no drift to prevent
   * and no contract to bury — appending one would add tokens to every English
   * turn for no behavioural gain, and would change English prompts that are
   * currently byte-for-byte unchanged by this whole fix.
   *
   * The guarantee therefore takes the form "English is structurally immune",
   * asserted below, rather than "English gets a trailing block".
   */
  it('deliberately renders no trailing block, keeping English prompts unchanged', () => {
    expect(buildOutputLanguageBlock('en')).toBe('')
  })

  it('still states its language contract, in the base prompt', () => {
    const { prompt } = assembleTail('en')
    expect(prompt).toMatch(/Communicate ONLY in English unless the student explicitly asks otherwise/)
  })

  it('has no non-English instruction anywhere that a later block could contradict', () => {
    // English's immunity is structural: the whole assembled prompt is English,
    // so no ordering change can weaken its language guarantee.
    const { prompt } = assembleTail('en')
    expect(prompt).not.toMatch(/[Ѐ-ӿ]/)   // no Cyrillic
    expect(prompt).not.toMatch(/[ऀ-ॿ]/) // no Devanagari
  })

  it('is unaffected by a verifier repair turn', () => {
    const plain = assembleTail('en').prompt
    const repaired = assembleTail('en', { repair: true }).prompt
    expect(repaired.startsWith(plain)).toBe(true)
    // Nothing but the appendix itself is added — no empty-string artifacts.
    expect(repaired.slice(plain.length)).toMatch(/^\n\nVERIFICATION VIOLATIONS/)
  })
})

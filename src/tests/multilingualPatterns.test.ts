/**
 * ISS-09 (masterplan P0) — Russian and Hindi recovery + autonomy corpora.
 *
 * THE GAP THIS CLOSES. The app teaches in en/ru/hi, and every recovery and
 * autonomy pattern was English-only. A Russian learner writing «я не понимаю»
 * reached the Recovery Engine as an ordinary answer and was handed another
 * QUESTION — the precise failure recovery exists to prevent, happening to the
 * two populations least able to ask for help in English.
 *
 * These corpora are the fixtures the masterplan asks for. They also assert
 * the design claim that makes the implementation small: because Cyrillic and
 * Devanagari cannot collide with Latin text, the sets need no language
 * parameter — the script discriminates.
 */
import { describe, it, expect } from 'vitest'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'
import { detectAutonomyRequest } from '@/lib/teaching/conversationState'

// ── Recovery corpora ────────────────────────────────────────────────────────

const RU_RECOVERY: Array<[string, string]> = [
  ['я не знаю', 'dont_know'],
  ['понятия не имею', 'dont_know'],
  ['я не понимаю', 'dont_understand'],
  ['ничего не понятно', 'dont_understand'],
  ['не понял', 'dont_understand'],
  ['я забыл', 'forgot'],
  ['я сдаюсь', 'give_up'],
  ['у меня не получается', 'cant'],
  ['я тупой', 'stupid'],
  ['это слишком сложно', 'too_hard'],
  ['мне страшно', 'scared'],
  ['слишком много вопросов', 'too_many_questions'],
]

const HI_RECOVERY: Array<[string, string]> = [
  ['मुझे नहीं पता', 'dont_know'],
  ['पता नहीं', 'dont_know'],
  ['समझ नहीं आया', 'dont_understand'],
  ['भूल गया', 'forgot'],
  ['मैं हार गया', 'give_up'],
  ['मुझसे नहीं होगा', 'cant'],
  ['बहुत मुश्किल है', 'too_hard'],
  ['मुझे डर लग रहा है', 'scared'],
  ['बहुत सारे सवाल', 'too_many_questions'],
]

const HINGLISH_RECOVERY: Array<[string, string]> = [
  ['mujhe nahi pata', 'dont_know'],
  ['pata nahi', 'dont_know'],
  ['samajh nahi aaya', 'dont_understand'],
  ['bhool gaya', 'forgot'],
  ['mujhse nahi hoga', 'cant'],
]

describe('ISS-09 — Russian distress reaches the Recovery Engine', () => {
  it.each(RU_RECOVERY)('%s → %s', (msg, key) => {
    expect(detectFailureState(msg)).toBe(key)
  })
})

describe('ISS-09 — Hindi (Devanagari) distress reaches the Recovery Engine', () => {
  it.each(HI_RECOVERY)('%s → %s', (msg, key) => {
    expect(detectFailureState(msg)).toBe(key)
  })
})

describe('ISS-09 — romanized Hindi distress reaches the Recovery Engine', () => {
  it.each(HINGLISH_RECOVERY)('%s → %s', (msg, key) => {
    expect(detectFailureState(msg)).toBe(key)
  })
})

describe('ISS-09 — the script is the discriminator', () => {
  it('English content is unaffected by the new sets', () => {
    // Regression guard: the English behaviour that already worked must be
    // byte-identical, and ordinary English answers must not now fire.
    expect(detectFailureState('I give up')).toBe('give_up')
    expect(detectFailureState('the pressure increases with depth')).toBeNull()
    expect(detectFailureState('gas solubility depends on partial pressure')).toBeNull()
  })

  it('ordinary ru/hi ANSWERS do not fire recovery', () => {
    // The other half of the claim: adding these sets must not turn correct
    // foreign-language answers into distress signals.
    expect(detectFailureState('давление увеличивается с глубиной')).toBeNull()
    expect(detectFailureState('गैस की घुलनशीलता दबाव पर निर्भर करती है')).toBeNull()
    expect(detectFailureState('yeh answer sahi hai')).toBeNull()
  })
})

// ── Autonomy corpora (ISS-08's asymmetry, in three languages) ───────────────

describe('ISS-09 — autonomy requests in ru/hi', () => {
  it.each([
    'следующая тема',
    'давай дальше',
    'идём дальше',
    'пропустить это',
    'अगला विषय',
    'आगे बढ़ें',
    'agla topic',
    'aage badho',
  ])('advances on %j', (msg) => {
    expect(detectAutonomyRequest(msg)).toBe(true)
  })

  it.each([
    'не надо дальше',
    'нет, следующая тема потом',
    'подожди, дальше рано',
    'अभी नहीं, अगला विषय बाद में',
    'नहीं, आगे मत बढ़ें',
    'abhi nahi, agla topic baad mein',
  ])('does NOT advance on %j', (msg) => {
    // Same asymmetry as English: advancing a learner who asked to STAY is
    // hollow advancement; asking again costs one turn.
    expect(detectAutonomyRequest(msg)).toBe(false)
  })

  it('English autonomy behaviour is unchanged', () => {
    expect(detectAutonomyRequest("let's move on")).toBe(true)
    expect(detectAutonomyRequest("I don't want to move on")).toBe(false)
  })
})

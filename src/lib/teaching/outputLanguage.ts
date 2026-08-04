/**
 * Output-language contract — the FINAL block of the system prompt.
 *
 * PRODUCTION DEFECT THIS EXISTS FOR (Russian learners, mixed-language output).
 *
 * buildTutorSystemPrompt() states the output-language contract exactly once,
 * in the first ~5 lines of the prompt:
 *
 *   src/lib/ai/client.ts:295  «Ты общаешься ТОЛЬКО на русском языке…»
 *
 * Up to ~60 further blocks are then appended by the chat route, and every one
 * of them is written in English — they are instructions ABOUT teaching
 * (TURN DIRECTIVE, TEACHING ENGINE DECISION, ANTI-REPETITION, MASTERY GATE,
 * FIRST LESSON PROTOCOL, RECOVERY, …), not learner-facing copy, so their
 * being English is correct and is NOT what this module changes.
 *
 * What it changes is POSITION. By the time the model starts generating, the
 * language contract is thousands of tokens back and outnumbered, while the
 * two most recent, most emphatic blocks assert their own supremacy in
 * English:
 *
 *   firstLessonGuard.buildFirstLessonBlock()
 *     "FIRST LESSON PROTOCOL — MANDATORY, OVERRIDES ANY CONFLICTING
 *      GUIDANCE ABOVE"
 *   recoveryGuard.buildRecoveryBlock()
 *     "RECOVERY — PREEMPTS EVERYTHING ABOVE"
 *
 * "Everything above" includes the Russian-language instruction. A model that
 * takes those two blocks literally is being told, last and most forcefully,
 * to disregard the only sentence that set the output language — and the
 * surrounding 60 blocks supply an overwhelming English register prior. That
 * is the mechanism behind Russian learners receiving English or half-English
 * turns, and it gets WORSE in exactly the moments that matter most: lesson
 * one, and the moment a learner says they are lost.
 *
 * The fix is deliberately not "translate 60 teaching blocks" — those blocks
 * are machine instructions with a single canonical English wording that the
 * verifier, tests and Educational Brain sources all key off, and translating
 * them would fork every one of them six ways. The smallest correct fix is to
 * restate the contract that already exists, in the one position where
 * recency holds: last.
 *
 * Renders '' for English, so English learners' prompts are byte-for-byte
 * unchanged.
 */

export type TeachingLanguage = 'en' | 'ru' | 'hi'

/**
 * The final block. Appended after every other block, including the two that
 * claim to override everything above them — so the language contract is not
 * something they can be read as overriding.
 *
 * Written in the target language: the closing tokens of the prompt set the
 * register the model continues in, which is the same recency effect that
 * caused the defect, used deliberately.
 */
export function buildOutputLanguageBlock(lang: TeachingLanguage): string {
  if (lang === 'ru') {
    return (
      '\n\nЯЗЫК ОТВЕТА — ОКОНЧАТЕЛЬНОЕ ПРАВИЛО, ВЫШЕ ЛЮБЫХ ИНСТРУКЦИЙ ВЫШЕ:\n' +
      '- Пиши студенту ТОЛЬКО по-русски. Это правило не отменяется никакими ' +
      'блоками выше, включая те, что заявляют, что они «преобладают над всем ' +
      'вышесказанным» — они управляют тем, ЧЕМУ и КАК учить, но никогда не ' +
      'языком ответа.\n' +
      '- Инструкции выше написаны по-английски, потому что это служебные ' +
      'указания для тебя, а не образец языка для студента. Не переходи на ' +
      'английский из-за них и не пересказывай их студенту.\n' +
      '- Общепринятые термины и обозначения (например, SI, pH, x²) остаются ' +
      'как есть; всё объяснение вокруг них — по-русски.\n' +
      '- Единственное исключение: студент сам явно попросил другой язык.'
    )
  }

  if (lang === 'hi') {
    return (
      '\n\nRESPONSE LANGUAGE — FINAL RULE, OUTRANKS EVERY INSTRUCTION ABOVE:\n' +
      '- Student se sirf Hindi/Hinglish mein baat karein. Yeh rule upar ke ' +
      'kisi bhi block se cancel nahi hota — un blocks mein jo likha hai ki woh ' +
      '"everything above" ko override karte hain, woh KYA aur KAISE padhana ' +
      'hai woh control karte hain, response ki language kabhi nahi.\n' +
      '- Upar ke instructions English mein isliye hain kyunki woh aapke liye ' +
      'machine instructions hain, student ke liye language ka example nahi. ' +
      'Unki wajah se English mein mat switch karein, aur unhe student ko mat ' +
      'sunayein.\n' +
      '- Technical terms English mein rakhein (variable, function, loop) — ' +
      'yeh pehle se hi is app ka contract hai.\n' +
      '- Ek hi exception: student khud explicitly doosri language maange.'
    )
  }

  // English: the base prompt's contract is already in the learner's language
  // and no English-register drift is possible, so nothing is appended.
  return ''
}

/**
 * THE CHECK PASS — OWNER DECISION 2026-10-07.
 *
 * About fifty logged defects were the model stating wrong facts or numbers in
 * its own worked examples: "4x − 7 = 9 … subtract 7 … x = 0.5" (MATH-007), a
 * coupon added to a price (MATH-008), "C₆H₅OH + 2 Na → C₆H₅ONa + H₂" (CHEM-053),
 * sodium IE₂ "10 000 kJ/mol" (CHEM-059), a 95 %-effective vaccine read as "950
 * of 1,000 protected" (BIO-041) … The deterministic numeric checker
 * (factCheckNumericShadow.ts, N1/N2/N3) was closed on 2026-10-04 at 6.3 %
 * precision; the owner chose a different instrument on 2026-10-07: before a
 * reply that carries numbers, equations or a worked example is sent, a SECOND
 * model call recomputes it and corrects clear errors, changing nothing else.
 *
 * This module is pure apart from the injected `ask` call: the route supplies
 * its provider chain. Every failure — timeout, provider error, an answer that
 * does not look like a corrected reply — keeps the original text. The pass can
 * only replace a reply with a corrected copy of itself; it never adds a card,
 * a question or a new topic.
 */

/** Does this reply carry anything the check pass can verify? */
export function needsFactCheck(text: string): boolean {
  const t = (text ?? '').trim()
  if (t.length < 80) return false
  // Arithmetic or an equation with numbers on it.
  if (/\d\s*[=×x*/÷+−-]\s*[\d(]|[=→⇌]\s*[-−]?\d/.test(t)) return true
  // A chemical formula or equation.
  if (/\b(?:[A-Z][a-z]?[₀-₉\d]+){1,}[A-Z]?[a-z]?/.test(t) && /[→⇌=+]/.test(t)) return true
  // A number with a unit or a percentage — a stated quantity.
  if (/\d(?:[.,]\d+)?\s*(?:%|kJ|J\b|kPa|Pa\b|mol\b|M\b|g\/mol|g\b|kg\b|mL\b|L\b|°C|K\b|V\b|nm\b|pm\b|m\/s|mmHg|atm\b|Hz\b|dB\b|cm²|m²)/.test(t)) return true
  // A worked example.
  if (/\b(?:step\s*1|worked example|for example|let'?s (?:solve|calculate|compute|work through))\b/i.test(t) && /\d/.test(t)) return true
  return false
}

export const FACT_CHECK_SYSTEM_PROMPT = [
  'You are a meticulous checker for a tutoring app. You receive one reply a tutor is about to send to a learner.',
  'Check it for clear errors only:',
  '- recompute every calculation and every unit conversion;',
  '- check every algebra step (the inverse operation, signs, the final answer substituted back);',
  '- check every chemical equation is balanced and every formula/name is right;',
  '- check every stated fact, constant and order of magnitude against standard textbook values;',
  '- check that a word problem\'s equation matches its story (a discount is subtracted, etc.);',
  '- check the reply does not contradict itself.',
  'If there is NO clear error, answer with exactly: OK',
  'If there ARE errors, answer with the FULL corrected reply and nothing else: same language, same tone, same length and',
  'formatting, same example — change only what is wrong (and the steps that follow from it). Do not add a preamble,',
  'notes, headings, apologies or a question. Do not mention that anything was checked or corrected.',
].join('\n')

export function buildFactCheckRequest(reply: string, conceptTitle: string | null): string {
  return `${conceptTitle ? `Lesson topic: ${conceptTitle}\n\n` : ''}Reply to check:\n<<<\n${reply.trim()}\n>>>`
}

/**
 * Read the checker's answer. Null = keep the original (no error found, or the
 * answer cannot be trusted as a corrected copy of the reply).
 */
export function readFactCheckAnswer(original: string, answer: string | null | undefined): string | null {
  const a = (answer ?? '').trim()
  if (!a) return null
  if (/^ok\b[.!]?$/i.test(a) || /^ok\b/i.test(a) && a.length < 40) return null
  let corrected = a.replace(/^<<<\s*/, '').replace(/\s*>>>$/, '').trim()
  // A preamble line about the check is dropped; anything else meta = distrust.
  corrected = corrected.replace(/^(?:here is|here's) the corrected (?:reply|version)[^\n]*\n+/i, '').trim()
  if (/\b(?:i (?:have )?corrected|the (?:original|above) reply|correction:|errors? (?:found|fixed)|as a checker)\b/i.test(corrected)) return null
  const ratio = corrected.length / Math.max(1, original.trim().length)
  if (ratio < 0.6 || ratio > 1.6) return null
  if (corrected === original.trim()) return null
  // A corrected COPY keeps most of the original's words; an answer that
  // shares few of them is a different reply (or the checker answering the
  // learner), never a correction.
  const wordsOf = (t: string): Set<string> => new Set((t.toLowerCase().match(/[a-z]{3,}/g) ?? []))
  const orig = wordsOf(original)
  if (orig.size > 0) {
    const kept = Array.from(orig).filter((w) => wordsOf(corrected).has(w)).length
    if (kept / orig.size < 0.6) return null
  }
  return corrected
}

/** Run the pass. `ask` is the route's provider call; `timeoutMs` bounds the added latency. */
export async function runFactCheckPass(input: {
  text: string
  conceptTitle: string | null
  ask: (system: string, user: string) => Promise<string | null>
  timeoutMs?: number
}): Promise<{ text: string; checked: boolean; corrected: boolean; reason: string }> {
  if (!needsFactCheck(input.text)) return { text: input.text, checked: false, corrected: false, reason: 'nothing-to-check' }
  try {
    const answer = await Promise.race([
      input.ask(FACT_CHECK_SYSTEM_PROMPT, buildFactCheckRequest(input.text, input.conceptTitle)),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), input.timeoutMs ?? 7000)),
    ])
    if (answer === null) return { text: input.text, checked: false, corrected: false, reason: 'timeout-or-no-answer' }
    const corrected = readFactCheckAnswer(input.text, answer)
    return corrected
      ? { text: corrected, checked: true, corrected: true, reason: 'corrected' }
      : { text: input.text, checked: true, corrected: false, reason: 'ok-or-untrusted' }
  } catch {
    return { text: input.text, checked: false, corrected: false, reason: 'error' }
  }
}

/** Prompt rules for every model-written reply (the first line of defence). */
export const WORKED_EXAMPLE_RULES =
  '\n\nWORKED EXAMPLES AND NUMBERS (mandatory): compute every number before you write it; in an algebra example '
  + 'use the correct inverse operation and end with a one-line check that substitutes the answer back; balance every '
  + 'chemical equation; use standard textbook values for constants and measured quantities, and never invent precise '
  + 'data — say "about" for a rough value; make a word problem\'s equation match its story (a discount or coupon is '
  + 'subtracted); keep the same example from the first step to the last; never contradict a number you gave earlier; '
  // PHYS-010: fringe width β with screen distance D, later y = λL/d.
  + 'keep the same symbol for the same quantity for the whole lesson.'

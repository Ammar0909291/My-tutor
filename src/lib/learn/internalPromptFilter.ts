/**
 * QA fix (2026-07-16, live browser pass): the lesson-opening bootstrap
 * instruction is sent with showInUI=false so the live session never shows
 * it — but the server persists it as an ordinary USER message, so every
 * HISTORY RESTORE (refresh / return next day) rendered the internal
 * prompt-engineering string as if the student had typed it. This detects
 * those templates (all three teaching languages, both the fresh-start and
 * continue variants generated in LessonScreen's startLesson) so restores
 * can filter them. Deliberately narrow: requires the template's distinctive
 * instruction markers, never just a greeting, so genuine student messages
 * can't be swallowed.
 */
export function isInternalOpeningPrompt(content: string): boolean {
  if (/Introduce yourself as "Tutor Max"/.test(content)) return true
  if (/Представься как "Репетитор Макс"/.test(content)) return true
  if (/Apna parichay do aur pehla explanation do/.test(content)) return true
  // Continue-variants: greeting + Level marker + sentence-budget tail.
  const hasLevel = /Level: "|Уровень: "/.test(content)
  const hasBudget = /3-4 sentences\.$|3-4 предложения\.$/.test(content)
  const hasContinueShape = /^(Hi!|Привет!|Namaste!)\s/.test(content) &&
    /(You were working on|Last session:|Continue from there|Ты работал над темой|В прошлый раз:|Продолжи с того места|Aap .* par kaam kar rahe the|Continue karein)/.test(content)
  return hasContinueShape && hasLevel && hasBudget
}

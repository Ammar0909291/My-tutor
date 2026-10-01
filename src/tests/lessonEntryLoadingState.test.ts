/**
 * THE BLANK FRAME AFTER "ADD SUBJECT" (2026-09-28).
 *
 * Measured on production with a disposable account: after Add on the
 * not-enrolled screen, the enroll POST took ~2.5 s, the refreshed page ~2 s,
 * then the curriculum and history fetches ~1.5 s — and for all of it the
 * learner saw either an idle "Add subject" button or an empty dark lesson
 * panel. Two display gaps, fixed at the source:
 *
 *   1. SubjectNotEnrolled cleared its busy state in a `finally` right after
 *      calling router.refresh(), which returns at once — so "Add subject" came
 *      back for the whole server re-render. The refresh now runs in a
 *      transition and the button stays busy until the new page replaces it.
 *   2. LessonScreen's entry overlays render nothing until the entry gate can
 *      answer (deliberately — no guessed Start-Lesson/prelude flash). A neutral
 *      loading line now fills exactly that gap and commits to neither overlay.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { translations } from '@/lib/i18n'

const read = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')

describe('Add subject stays busy until the new page arrives', () => {
  const src = read('src/components/learn/SubjectNotEnrolled.tsx')

  it('refreshes inside a transition and reads busy from it', () => {
    expect(src).toContain('startRefresh(() => router.refresh())')
    expect(src).toMatch(/const busy = loading \|\| refreshing/)
    expect(src).toContain('disabled={busy}')
    expect(src).toContain('{busy ? copy.adding : copy.add}')
  })

  it('no longer clears the busy state in a finally after the refresh call', () => {
    expect(src).not.toMatch(/finally\s*\{\s*setLoading\(false\)/)
  })
})

describe('the lesson area is never a blank panel while the entry gate loads', () => {
  const src = read('src/components/learn/LessonScreen.tsx')
  const loading = src.indexOf('data-testid="lesson-entry-loading"')

  it('renders a status line exactly while the gate cannot answer', () => {
    expect(loading).toBeGreaterThan(0)
    const head = src.lastIndexOf('{!lessonStarted', loading)
    expect(src.slice(head, loading)).toContain('!lessonStarted && messages.length === 0 && !entryGateReady')
    expect(src.slice(loading, loading + 600)).toContain("t('learn_loading_lesson')")
    expect(src.slice(head, loading)).toContain('role="status"')
  })

  it('is mutually exclusive with both entry overlays (each needs the gate ready)', () => {
    expect(src).toMatch(/const preludeVisible = entryGateReady && /)
    expect(src).toContain('!lessonStarted && messages.length === 0 && entryGateReady && !preludeVisible')
  })

  it('its label exists in every UI language', () => {
    for (const lang of Object.keys(translations) as (keyof typeof translations)[]) {
      expect((translations[lang] as Record<string, string>).learn_loading_lesson, lang).toBeTruthy()
    }
  })
})

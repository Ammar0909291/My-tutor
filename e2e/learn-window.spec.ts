import { test, expect } from '@playwright/test'

// Requires: local Postgres + `npx tsx e2e/seed-test-user.ts` + `npm run dev`.
// See e2e/README.md. Scoped to the three live curriculums (physics,
// mathematics, english) — the others are hidden pending new curricula.

async function login(page: import('@playwright/test').Page) {
  await page.goto('/auth/login', { waitUntil: 'networkidle' })
  await page.fill('input[type="email"], input[name="email"]', 'test@example.com')
  await page.fill('input[type="password"], input[name="password"]', 'password123')
  await page.click('button[type="submit"]')
  await page.waitForURL('**/dashboard', { timeout: 10_000 })
}

test.describe('Learn window — physics', () => {
  test('lesson does not auto-start; Start Lesson gates the AI', async ({ page }) => {
    await login(page)
    await page.goto('/learn?subject=physics', { waitUntil: 'networkidle' })

    // FIX 1: no session/messages should exist yet — the AI must not have
    // spoken, and the gate button must be visible.
    await expect(page.getByRole('button', { name: /start lesson/i })).toBeVisible()
    await expect(page.getByText(/connecting to tutor/i)).toHaveCount(0)

    await page.getByRole('button', { name: /start lesson/i }).click()

    // Once started, the loading state (or a real reply) should appear —
    // either way the gate button must be gone.
    await expect(page.getByRole('button', { name: /start lesson/i })).toHaveCount(0)
  })

  test('right panel shows only Quick Actions — no duplicate Quick Check card', async ({ page }) => {
    await login(page)
    await page.goto('/learn?subject=physics', { waitUntil: 'networkidle' })

    await expect(page.getByText(/what would you like to do/i)).toBeVisible()
    await expect(page.getByText(/explain in simpler way/i)).toBeVisible()
    await expect(page.getByText(/show real-life example/i)).toBeVisible()
    await expect(page.getByText(/give me a diagram/i)).toBeVisible()
    await expect(page.getByText(/challenge me/i)).toBeVisible()

    // FIX 4: the standalone "Quick Check" card that used to live in this
    // panel is gone — Quick Check only appears inline in the chat feed now.
    await expect(page.getByText(/^Quick Check$/i)).toHaveCount(0)
  })

  test('bookmark toggles and persists across reload', async ({ page }) => {
    await login(page)
    await page.goto('/learn?subject=physics', { waitUntil: 'networkidle' })

    // Real state persists in the DB across repeated runs of this suite, so
    // normalize to a known starting point (not bookmarked) rather than
    // assuming one — makes the test deterministic on repeat runs.
    //
    // The app fires the persistence POST without awaiting it (correct for a
    // snappy optimistic UI), so reloading the instant the UI updates can race
    // ahead of the network write. Wait for that POST to actually resolve
    // before reloading — this is a test-timing accommodation, not a
    // production concern (no real user reloads a page a millisecond after
    // clicking a button).
    const bookmarkBtn = () => page.getByRole('button', { name: /bookmark this lesson/i })
    const waitForBookmarkPost = () => page.waitForResponse((r) => r.url().includes('/api/curriculum/bookmark') && r.request().method() === 'POST')

    if ((await bookmarkBtn().getAttribute('aria-pressed')) === 'true') {
      await Promise.all([waitForBookmarkPost(), bookmarkBtn().click()])
      await expect(bookmarkBtn()).toHaveAttribute('aria-pressed', 'false')
    }

    await Promise.all([waitForBookmarkPost(), bookmarkBtn().click()])
    await expect(bookmarkBtn()).toHaveAttribute('aria-pressed', 'true')

    await page.reload({ waitUntil: 'networkidle' })
    await expect(bookmarkBtn()).toHaveAttribute('aria-pressed', 'true')

    // Clean up — restore original (not bookmarked) state.
    await bookmarkBtn().click()
    await expect(bookmarkBtn()).toHaveAttribute('aria-pressed', 'false')
  })

  test('Escape closes an open dropdown menu', async ({ page }) => {
    await login(page)
    await page.goto('/learn?subject=physics', { waitUntil: 'networkidle' })

    const langBtn = page.getByRole('button', { name: /language/i }).first()
    await langBtn.click()
    await expect(langBtn).toHaveAttribute('aria-expanded', 'true')

    await page.keyboard.press('Escape')
    await expect(langBtn).toHaveAttribute('aria-expanded', 'false')
  })

  test('Complete Lesson advances the curriculum pointer to the next lesson', async ({ page }) => {
    await login(page)
    await page.goto('/learn?subject=physics', { waitUntil: 'networkidle' })

    // Complete Lesson always acts on whatever is currently "current" and
    // (per StudentProgress's currentLesson = MAX(existing, completed+1) logic)
    // immediately advances the pointer to the next lesson — so the button
    // shown after clicking is a fresh "Complete Lesson" for the NEW current
    // lesson, not a "Lesson Completed" toggle for the one just finished. That
    // toggle only ever renders for a lesson that is simultaneously "current"
    // and already completed, which normal forward progress never produces.
    const lessonCounter = page.getByText(/^Lesson \d+ \/ \d+$/)
    const before = await lessonCounter.textContent()

    // The completion PATCH awaits an XP award + AI flashcard generation
    // before responding — give it real headroom instead of the default 5s.
    await page.getByRole('button', { name: /Complete Lesson$/ }).click()
    await expect(lessonCounter).not.toHaveText(before!, { timeout: 15_000 })

    const beforeNum = Number(before!.match(/Lesson (\d+)/)![1])
    const afterNum = Number((await lessonCounter.textContent())!.match(/Lesson (\d+)/)![1])
    expect(afterNum).toBe(beforeNum + 1)
  })
})

test.describe('Learn window — mathematics and english use the same pipeline', () => {
  for (const subject of ['mathematics', 'english']) {
    test(`${subject} loads its full canonical roadmap, not a legacy one`, async ({ page }) => {
      await login(page)
      const res = await page.request.get(`/api/curriculum?subject=${subject}`)
      const data = await res.json()
      expect(data.success).toBe(true)
      // Legacy English had 32 lessons; canonical KGs are 216 (english/physics) or
      // 908 (mathematics) — 100 cleanly separates "canonical" from "legacy".
      expect(data.lessons.length).toBeGreaterThan(100)
    })
  }
})

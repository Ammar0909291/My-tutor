import { test, expect, type Page } from '@playwright/test'

// ADR 16, gate G3 — the ONE-concept production pilot, through the SERVED path.
//
// /dev/visual-demo/simulation/served?concept=<id> runs the real resolveVisual
// on the server and renders its decision through SceneSpecFigure, exactly as
// LessonScreen renders a lesson turn's sceneSpec. No database or login needed.
//
//   E2E_BASE_URL=http://localhost:3000 npx playwright test e2e/simulation-newton-g3.spec.ts

test.setTimeout(180_000)
if (process.env.PW_CHROMIUM_PATH) test.use({ launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH } })

const PILOT = 'phys.mech.newtons-second-law'
const served = (id: string) => `/dev/visual-demo/simulation/served?concept=${encodeURIComponent(id)}`
const sim = (page: Page) => page.getByTestId('simulation')
const phase = (page: Page) => sim(page).getAttribute('data-phase')
const tick = async (page: Page) => Number(await sim(page).getAttribute('data-tick'))

/** Set the sliders. The next click follows IMMEDIATELY — that is the regression under test. */
async function setValues(page: Page, force: string, mass: string) {
  await page.getByLabel('F (N)').fill(force)
  await page.getByLabel('m (kg)').fill(mass)
}

async function open(page: Page, id: string) {
  await page.goto(served(id), { waitUntil: 'networkidle', timeout: 150_000 })
  await expect(page.getByTestId('served-provenance')).toBeVisible({ timeout: 60_000 })
  // The app uses `scroll-behavior: smooth`. fill() scrolls a slider into view and
  // returns while the page is still gliding, so an immediate click lands where
  // the button USED to be (measured: the button's page position never moved;
  // scrollY went 8 → 424 over 400 ms). Harness-only: make scrolling instant.
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })
}

test.describe('the pilot concept', () => {
  test('1–2. loads through the resolver and serves the Newton simulation', async ({ page }) => {
    await open(page, PILOT)
    await expect(page.getByTestId('served-provenance')).toHaveText('generator:kind-default:newton_second_law')
    await expect(page.getByTestId('served-renderer')).toHaveText('scene')
    await expect(page.getByTestId('served-kind')).toHaveText('newton_second_law')
    await expect(sim(page)).toBeVisible()
    expect(await phase(page)).toBe('idle')
    expect(await tick(page)).toBe(0)
  })

  test('3–8, 10, 13–16. controls, prediction, lock, v–t graph, labels, guidance, no side effects', async ({ page }) => {
    await open(page, PILOT)
    const storage = () => page.evaluate(() => [Object.keys(localStorage).sort(), Object.keys(sessionStorage).sort()])
    const storageBefore = await storage()
    const requests: string[] = []
    page.on('request', (r) => {
      const url = r.url()
      if (url.includes('/_next/') || url.includes('__nextjs')) return // dev-server tooling
      requests.push(`${r.method()} ${url}`)
    })

    // 4. Prediction.
    const prediction = page.getByTestId('prediction')
    await prediction.getByRole('button', { name: 'It halves' }).click()
    await expect(prediction).toContainText('Your prediction: It halves.')
    await expect(prediction.getByText(/Test it fairly: change only m/)).toBeVisible() // 15

    // 5, 10, 13. Run a slow case; values lock; the speed and the v–t graph advance.
    await setValues(page, '1', '10')
    await page.getByRole('button', { name: 'Run' }).click()
    await expect.poll(() => phase(page)).toBe('running')
    await expect(page.getByLabel('F (N)')).toBeDisabled()
    await expect(page.getByLabel('m (kg)')).toBeDisabled()
    await expect.poll(() => tick(page)).toBeGreaterThan(60)
    const legend = page.getByLabel('What the colours mean')
    await expect(legend).toContainText('Velocity time graph') // the v–t trace is drawn
    // 14. No internal ids in learner-facing labels.
    const legendText = await legend.innerText()
    expect(legendText).not.toMatch(/\bVt\b|vt-|current-velocity|velocity-time-graph|-label\b/)

    // 6. Pause holds the state.
    await page.getByRole('button', { name: 'Pause' }).click()
    expect(await phase(page)).toBe('paused')
    const at = await tick(page)
    await page.waitForTimeout(500)
    expect(await tick(page)).toBe(at)
    // 7. Step +5 ticks.
    await page.getByRole('button', { name: 'Step 0.1 s' }).click()
    expect(await tick(page)).toBe(at + 5)
    // 8. Reset.
    await page.getByRole('button', { name: 'Reset' }).click()
    expect(await tick(page)).toBe(0)

    // 15. A fair test answers the prediction; the explanation is VISIBLE.
    await setValues(page, '10', '2')
    await page.getByRole('button', { name: 'Run' }).click()
    await expect.poll(() => phase(page), { timeout: 15_000 }).toBe('finished')
    await setValues(page, '10', '4')
    await page.getByRole('button', { name: 'Run' }).click()
    await expect.poll(() => phase(page), { timeout: 15_000 }).toBe('finished')
    const interpretation = page.getByTestId('interpretation')
    await expect(interpretation).toContainText('That matches your prediction.')
    await expect(interpretation.getByText(/inversely proportional to mass/)).toBeVisible()

    // 16. No network, no storage.
    expect(requests).toEqual([])
    expect(await storage()).toEqual(storageBefore)
  })

  test('11–12, 9. hidden-tab pause; reduced motion with seek', async ({ page }) => {
    await open(page, PILOT)
    await setValues(page, '1', '10')
    await page.getByRole('button', { name: 'Run' }).click()
    await expect.poll(() => tick(page)).toBeGreaterThan(10)
    await page.evaluate(() => {
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' })
      document.dispatchEvent(new Event('visibilitychange'))
    })
    await expect.poll(() => phase(page)).toBe('paused')

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await open(page, PILOT)
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true)
    await expect(page.getByRole('button', { name: 'Run' })).toHaveCount(0)
    const scrubber = page.getByRole('slider', { name: 'Time', exact: true })
    await scrubber.fill('70')
    expect(await tick(page)).toBe(70)
    await expect(page.getByTestId('readout-t')).toHaveText('1.40 s')
  })
})

test.describe('17–18. everything else keeps its existing path', () => {
  test('an unrelated parametric scene (projectile motion) renders as before — no simulation', async ({ page }) => {
    await open(page, 'phys.mech.projectile-motion')
    await expect(page.getByTestId('served-kind')).toHaveText('projectile')
    await expect(page.getByRole('group', { name: 'Animations' })).toBeVisible()
    await expect(sim(page)).toHaveCount(0)
  })

  for (const id of ['phys.mech.newtons-first-law', 'phys.mech.newtons-third-law', 'phys.mech.force']) {
    test(`${id} is not given the simulation`, async ({ page }) => {
      await open(page, id)
      await expect(page.getByTestId('served-kind')).not.toHaveText('newton_second_law')
      await expect(sim(page)).toHaveCount(0)
    })
  }
})

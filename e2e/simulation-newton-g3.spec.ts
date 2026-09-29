import { test, expect, type Page } from '@playwright/test'
import { classifyRequest, watchNetwork } from './simulationNetwork'

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
    const network = watchNetwork(page, new URL(page.url()).origin)

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
    expect(network.unexpected()).toEqual([])
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

// ── Pilot polish (master loop): answer withholding, chrome, state, layout ────

const figure = (page: Page) => page.getByRole('figure').first()
/** Every learner-visible string in the figure, plus its accessible description. */
async function visibleFigureText(page: Page) {
  return `${await figure(page).innerText()} | ${await figure(page).getAttribute('aria-label')}`
}
const happening = (page: Page) => page.locator('section', { has: page.getByRole('heading', { name: "What's happening?" }) })
const LEAK = /\ba\s*=|m\/s²|F\s*\/\s*m/

test.describe('pilot polish', () => {
  test('#1 no acceleration value, arrow or label before the run — also after changing values', async ({ page }) => {
    await open(page, PILOT)
    expect(await visibleFigureText(page)).not.toMatch(LEAK)
    await setValues(page, '10', '4') // a would be 2.50 m/s²
    await expect(page.getByTestId('simulation')).toHaveAttribute('data-tick', '0')
    const text = await visibleFigureText(page)
    expect(text).not.toMatch(LEAK)
    expect(text).not.toContain('2.50')
    await expect(page.getByTestId('readout-a_measured')).toHaveCount(0)
    // …and it appears once the run has shown it.
    await page.getByRole('button', { name: 'Run' }).click()
    await expect.poll(() => tick(page)).toBeGreaterThan(5)
    await page.getByRole('button', { name: 'Pause' }).click()
    expect(await visibleFigureText(page)).toContain('a = 2.50 m/s²')
  })

  test('#3 "What\'s happening?" follows the state: start, running, paused, finished', async ({ page }) => {
    await open(page, PILOT)
    await expect(happening(page)).toContainText('ready to push the 2.0 kg block from rest')
    await setValues(page, '1', '10')
    await page.getByRole('button', { name: 'Run' }).click()
    await expect.poll(() => tick(page)).toBeGreaterThan(20)
    await expect(happening(page)).toContainText('The block is speeding up')
    await page.getByRole('button', { name: 'Pause' }).click()
    const t = (await page.getByTestId('readout-t').innerText()).replace(' s', '')
    await expect(happening(page)).toContainText(`after ${t} s`) // the panel and the readout agree
    await page.getByRole('button', { name: 'Reset' }).click()
    await expect(happening(page)).toContainText('ready to push')
    await setValues(page, '10', '2')
    await page.getByRole('button', { name: 'Run' }).click()
    await expect.poll(() => phase(page), { timeout: 15_000 }).toBe('finished')
    await expect(happening(page)).toContainText('reached the end of the track after 2.84 s')
  })

  test('#4–5 v–t graph labels are shown; no live value is painted on the canvas', async ({ page }) => {
    await open(page, PILOT)
    const scene = figure(page).locator('[data-scene-box]')
    for (const t of ['t (s)', 'v (m/s)', '0', '10', '45']) await expect(scene.getByText(t, { exact: true })).toBeVisible()
    await setValues(page, '1', '10')
    await page.getByRole('button', { name: 'Run' }).click()
    await expect.poll(() => tick(page)).toBeGreaterThan(20)
    await expect(figure(page).getByText(/^(v|t) = /)).toHaveCount(0)
  })

  test('#6 prediction options read as live; disabled controls read as disabled', async ({ page }) => {
    await open(page, PILOT)
    const option = page.getByTestId('prediction').getByRole('button', { name: 'It halves' })
    const pause = page.getByRole('button', { name: 'Pause' })
    await expect(pause).toBeDisabled()
    const opacity = (l: typeof option) => l.evaluate((el) => Number(getComputedStyle(el).opacity))
    expect(await opacity(option)).toBe(1)
    expect(await opacity(pause)).toBeLessThan(0.6)
    const colour = (l: typeof option) => l.evaluate((el) => getComputedStyle(el).color)
    expect(await colour(option)).not.toBe(await colour(pause))
  })

  test('#7 the generic figure chrome is not shown over the simulation', async ({ page }) => {
    await open(page, PILOT)
    await expect(page.getByRole('group', { name: 'How this is shown' })).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'Previous stage' })).toHaveCount(0)
    await expect(page.getByText(/more labels? (is|are) on this figure/)).toHaveCount(0)
    await expect(page.getByText('More insights')).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Try changing values' })).toHaveCount(0)
    // …and it is still there for a figure that is not a simulation.
    await open(page, 'phys.mech.projectile-motion')
    await expect(page.getByRole('heading', { name: 'Try changing values' })).toBeVisible()
  })

  for (const width of [390, 1280]) {
    test(`#8 layout at ${width}px: no overflow, no empty header band, controls beside the figure`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 })
      await open(page, PILOT)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
      const header = await figure(page).locator('header').boundingBox()
      const title = await figure(page).getByRole('heading', { level: 3 }).boundingBox()
      expect(header!.height - title!.height).toBeLessThan(40) // measured before: a ≈ 200px empty band at 390
      const canvas = await figure(page).locator('canvas').first().boundingBox()
      const slider = await page.getByLabel('F (N)').boundingBox()
      const run = await page.getByRole('button', { name: 'Run' }).boundingBox()
      expect(slider!.y - (canvas!.y + canvas!.height)).toBeLessThan(260)
      expect(run!.y - (slider!.y + slider!.height)).toBeLessThan(160)
      await page.screenshot({ path: `test-results/newton-pilot-${width}.png`, fullPage: true })
    })
  }
})

test.describe('#10 the network assertion distinguishes the app shell from the simulation', () => {
  const origin = 'http://localhost:3000'
  test('classifier: only the exact session GET is app shell', () => {
    expect(classifyRequest('GET', `${origin}/api/auth/session`, origin)).toBe('app-shell')
    expect(classifyRequest('GET', `${origin}/_next/static/chunks/app.js`, origin)).toBe('dev-tooling')
    for (const [m, u] of [
      ['POST', `${origin}/api/auth/session`],
      ['GET', `${origin}/api/auth/session?probe=1`],
      ['POST', `${origin}/api/learn/chat`],
      ['GET', `${origin}/api/curriculum?subject=physics`],
      ['GET', `${origin}/api/progress`],
      ['GET', 'https://ywakxiqbevfuxsiwewnw.supabase.co/rest/v1/topic_progress'],
      ['GET', 'https://evil.example/api/auth/session'],
    ]) expect(classifyRequest(m, u, origin), `${m} ${u}`).toBe('unexpected')
  })

  test('negative control: a request from the page to the tutor or an API is caught', async ({ page }) => {
    await open(page, PILOT)
    const network = watchNetwork(page, new URL(page.url()).origin)
    await page.evaluate(async () => {
      await fetch('/api/auth/session').catch(() => null) // the one allowed shell request
      await fetch('/api/learn/chat', { method: 'POST', body: '{}' }).catch(() => null)
      await fetch('/api/progress').catch(() => null)
    })
    await expect.poll(() => network.unexpected().length).toBe(2)
    expect(network.unexpected().join('\n')).toMatch(/POST .*\/api\/learn\/chat/)
    expect(network.appShell()).toHaveLength(1)
  })
})

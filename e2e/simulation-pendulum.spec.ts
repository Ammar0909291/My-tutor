import { test, expect, type Page } from '@playwright/test'
import { watchNetwork } from './simulationNetwork'

// ADR 16, second pilot — the pendulum-period simulation, through the SERVED path.
//
// /dev/visual-demo/simulation/served?concept=<id> runs the real resolveVisual
// on the server and renders its decision through SceneSpecFigure, exactly as
// LessonScreen renders a lesson turn's sceneSpec. No database or login needed.
//
//   E2E_BASE_URL=http://localhost:3000 npx playwright test e2e/simulation-pendulum.spec.ts

test.setTimeout(180_000)
if (process.env.PW_CHROMIUM_PATH) test.use({ launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH } })

const PILOT = 'phys.wave.pendulum'
const served = (id: string) => `/dev/visual-demo/simulation/served?concept=${encodeURIComponent(id)}`
const sim = (page: Page) => page.getByTestId('simulation')
const phase = (page: Page) => sim(page).getAttribute('data-phase')
const tick = async (page: Page) => Number(await sim(page).getAttribute('data-tick'))
const figure = (page: Page) => page.getByRole('figure').first()
const happening = (page: Page) => page.locator('section', { has: page.getByRole('heading', { name: "What's happening?" }) })

async function open(page: Page, id = PILOT) {
  await page.goto(served(id), { waitUntil: 'networkidle', timeout: 150_000 })
  await expect(page.getByTestId('served-provenance')).toBeVisible({ timeout: 60_000 })
  // Harness-only: the app's smooth scrolling moves a button mid-click (see the Newton G3 spec).
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })
}

/** Set the sliders. The next click follows IMMEDIATELY. */
async function setValues(page: Page, v: { length?: string; angle?: string; mass?: string }) {
  if (v.length) await page.getByLabel('L (m)').fill(v.length)
  if (v.angle) await page.getByLabel('Swing angle (°)').fill(v.angle)
  if (v.mass) await page.getByLabel('m (kg)').fill(v.mass)
}

async function runToEnd(page: Page) {
  await page.getByRole('button', { name: 'Run' }).click()
  await expect.poll(() => phase(page), { timeout: 20_000 }).toBe('finished')
}

test.describe('the pendulum pilot', () => {
  test('loads through the resolver, idle at tick 0, with the answer withheld', async ({ page }) => {
    await open(page)
    await expect(page.getByTestId('served-provenance')).toHaveText('generator:kind-default:pendulum_period')
    await expect(page.getByTestId('served-kind')).toHaveText('pendulum_period')
    expect(await phase(page)).toBe('idle')
    expect(await tick(page)).toBe(0)
    const text = `${await figure(page).innerText()} | ${await figure(page).getAttribute('aria-label')}`
    expect(text).not.toMatch(/\bT\s*=|2π|√|period|one swing \(measured\)/i)
    await expect(page.getByTestId('readout-period_measured')).toHaveCount(0)
    await expect(happening(page)).toContainText('held 10° to the side on a 1.00 m string')
  })

  test('predict → experiment → fair test → interpretation; lock, pause, step, reset; no network, no storage', async ({ page }) => {
    await open(page)
    const storage = () => page.evaluate(() => [Object.keys(localStorage).sort(), Object.keys(sessionStorage).sort()])
    const storageBefore = await storage()
    const network = watchNetwork(page, new URL(page.url()).origin)

    // Predict.
    const prediction = page.getByTestId('prediction')
    await expect(prediction).toHaveAttribute('data-prediction-id', 'longer-string')
    await prediction.getByRole('button', { name: 'It doubles' }).click()
    await expect(prediction).toContainText('Your prediction: It doubles.')
    await expect(prediction.getByText(/Test it fairly: change only L, keep Swing angle and m the same/)).toBeVisible()

    // Run; values lock; the swing and the trace advance.
    await setValues(page, { length: '0.5' })
    await page.getByRole('button', { name: 'Run' }).click()
    await expect.poll(() => phase(page)).toBe('running')
    await expect(page.getByLabel('L (m)')).toBeDisabled()
    await expect(page.getByLabel('m (kg)')).toBeDisabled()
    await expect.poll(() => tick(page)).toBeGreaterThan(40)
    await expect(happening(page)).toContainText(/has not yet come back|has made 1 full swing|has made 2 full swings/)

    // Pause holds the state; Step is 0.1 s (10 ticks); Reset returns to the start.
    await page.getByRole('button', { name: 'Pause' }).click()
    expect(await phase(page)).toBe('paused')
    const at = await tick(page)
    await page.waitForTimeout(400)
    expect(await tick(page)).toBe(at)
    await page.getByRole('button', { name: 'Step 0.1 s' }).click()
    expect(await tick(page)).toBe(at + 10)
    await page.getByRole('button', { name: 'Reset' }).click()
    expect(await tick(page)).toBe(0)

    // Observe: a full run measures the time for one swing.
    await runToEnd(page)
    await expect(page.getByTestId('simulation-status')).toContainText('the bob made 3 full swings')
    await expect(page.getByTestId('readout-period_measured')).toHaveText('1.42 s')
    await expect(happening(page)).toContainText('made 3 full swings in')

    // Fair test: four times the length, nothing else changed.
    await setValues(page, { length: '2' })
    await runToEnd(page)
    await expect(page.getByTestId('readout-period_measured')).toHaveText('2.84 s')
    const interpretation = page.getByTestId('interpretation')
    await expect(interpretation).toContainText('square root')
    await expect(interpretation).toContainText('That matches your prediction.')
    await expect(interpretation.getByText(/Four times the length gives twice the time/)).toBeVisible()
    // Three runs: the paused-then-reset one is recorded too, as it is for Newton.
    await expect(page.getByTestId('simulation-runs').locator('tbody tr')).toHaveCount(3)
    await expect(page.getByTestId('simulation-runs')).toContainText('one swing (measured)')

    // The next prediction opens: the mass.
    await expect(page.getByTestId('prediction')).toHaveAttribute('data-prediction-id', 'heavier-bob')

    expect(network.unexpected()).toEqual([])
    expect(await storage()).toEqual(storageBefore)
  })

  test('the heavier-bob fair test shows no change', async ({ page }) => {
    await open(page)
    // Answer the first prediction first, so the mass one is open.
    await page.getByTestId('prediction').getByRole('button', { name: 'Skip — just experiment' }).click()
    await setValues(page, { length: '0.5' })
    await runToEnd(page)
    await setValues(page, { length: '1' })
    await runToEnd(page)
    const prediction = page.getByTestId('prediction')
    await expect(prediction).toHaveAttribute('data-prediction-id', 'heavier-bob')
    await prediction.getByRole('button', { name: 'It gets shorter' }).click()
    await setValues(page, { mass: '1' })
    await runToEnd(page)
    const mass = page.getByTestId('interpretation').filter({ hasText: 'm ×2' })
    await expect(mass).toContainText('it stayed the same, to within 2%')
    await expect(mass).toContainText('That is not what you predicted')
    await expect(mass.getByText(/The mass makes no difference/)).toBeVisible()
  })

  test('the generic figure chrome is not shown over the simulation', async ({ page }) => {
    await open(page)
    await expect(page.getByRole('group', { name: 'How this is shown' })).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'Previous stage' })).toHaveCount(0)
    await expect(page.getByText(/more labels? (is|are) on this figure/)).toHaveCount(0)
    await expect(page.getByText('More insights')).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Try changing values' })).toHaveCount(0)
    const scene = figure(page).locator('[data-scene-box]')
    for (const t of ['t (s)', 'angle (°)', '10', '30', 'lowest point']) await expect(scene.getByText(t, { exact: true })).toBeVisible()
  })

  test('hidden-tab pause; reduced motion with seek', async ({ page }) => {
    await open(page)
    await page.getByRole('button', { name: 'Run' }).click()
    await expect.poll(() => tick(page)).toBeGreaterThan(10)
    await page.evaluate(() => {
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' })
      document.dispatchEvent(new Event('visibilitychange'))
    })
    await expect.poll(() => phase(page)).toBe('paused')

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await open(page)
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true)
    await expect(page.getByRole('button', { name: 'Run' })).toHaveCount(0)
    const scrubber = page.getByRole('slider', { name: 'Time', exact: true })
    await scrubber.fill('300')
    expect(await tick(page)).toBe(300)
    await expect(page.getByTestId('readout-t')).toHaveText('3.00 s')
    await expect(page.getByTestId('readout-period_measured')).toHaveText('2.01 s')
  })

  for (const width of [390, 1280]) {
    test(`layout at ${width}px: no overflow, no empty header band, controls beside the figure`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 })
      await open(page)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
      const header = await figure(page).locator('header').boundingBox()
      const title = await figure(page).getByRole('heading', { level: 3 }).boundingBox()
      expect(header!.height - title!.height).toBeLessThan(40)
      const canvas = await figure(page).locator('canvas').first().boundingBox()
      const slider = await page.getByLabel('L (m)').boundingBox()
      const run = await page.getByRole('button', { name: 'Run' }).boundingBox()
      expect(slider!.y - (canvas!.y + canvas!.height)).toBeLessThan(300)
      expect(run!.y - (slider!.y + slider!.height)).toBeLessThan(200)
      await page.screenshot({ path: `test-results/pendulum-pilot-${width}.png`, fullPage: true })
    })
  }
})

test.describe('everything else keeps its path', () => {
  test('Newton still serves the Newton simulation', async ({ page }) => {
    await open(page, 'phys.mech.newtons-second-law')
    await expect(page.getByTestId('served-kind')).toHaveText('newton_second_law')
    await expect(sim(page)).toBeVisible()
  })

  for (const id of ['phys.wave.shm', 'phys.wave.shm-energy']) {
    test(`${id} keeps the static pendulum figure, with no simulation`, async ({ page }) => {
      await open(page, id)
      await expect(page.getByTestId('served-kind')).toHaveText('pendulum')
      await expect(sim(page)).toHaveCount(0)
      await expect(page.getByRole('heading', { name: 'Try changing values' })).toBeVisible()
    })
  }

  test('a static card concept is unchanged', async ({ page }) => {
    await open(page, 'phys.mech.newtons-first-law')
    await expect(page.getByTestId('served-renderer')).toHaveText('card')
    await expect(sim(page)).toHaveCount(0)
  })
})

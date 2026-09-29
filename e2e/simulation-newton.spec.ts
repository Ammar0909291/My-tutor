import { test, expect, type Page } from '@playwright/test'
import { watchNetwork } from './simulationNetwork'

// ADR 16, gate G2 — the Newton's-second-law simulation in a real browser.
//
// Needs only a dev server (`npm run dev`, or `next dev` with AUTH_SECRET set):
// the page is /dev/visual-demo/simulation, which renders the production
// ExplainerFigure from the parametric registry, touches no database, and
// returns 404 in production. No concept is bound to the simulation, so this is
// the only place it can be seen.
//
//   E2E_BASE_URL=http://localhost:3000 npx playwright test e2e/simulation-newton.spec.ts

const PAGE = '/dev/visual-demo/simulation'

test.setTimeout(180_000)
// Optional: a pre-installed Chromium when the pinned Playwright's own browser
// build is not present (e.g. PW_CHROMIUM_PATH=/opt/pw-browsers/chromium).
if (process.env.PW_CHROMIUM_PATH) test.use({ launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH } })

const sim = (page: Page) => page.getByTestId('simulation')
const phase = (page: Page) => sim(page).getAttribute('data-phase')
const tick = async (page: Page) => Number(await sim(page).getAttribute('data-tick'))
const vtPoints = async (page: Page) => Number(await page.getByTestId('inspect-vt-points').innerText())
type Ev = { kind: string; id: string; action?: string; predictionId?: string; choice?: number | null; runId?: string; observedRelation?: string; matchedPrediction?: boolean | null; runIds?: string[] }
const evidence = async (page: Page): Promise<Ev[]> => JSON.parse(await page.getByTestId('sim-evidence').innerText())

async function open(page: Page) {
  await page.goto(PAGE, { waitUntil: 'networkidle', timeout: 150_000 })
  await expect(sim(page)).toBeVisible({ timeout: 60_000 })
}

/** Slow values (a = 0.1 m/s²): the run lasts the full 10 s, long enough to act on it. */
async function setSlow(page: Page) {
  await page.getByLabel('F (N)').fill('1')
  await page.getByLabel('m (kg)').fill('10')
  await expect(page.getByTestId('inspect-params')).toHaveText('{"force":1,"mass":10}')
}

test('1–2. the dev visual demo links to the Newton simulation, which loads', async ({ page }) => {
  await page.goto('/dev/visual-demo', { waitUntil: 'domcontentloaded', timeout: 150_000 })
  const link = page.getByTestId('newton-simulation-link')
  await expect(link).toBeVisible({ timeout: 60_000 })
  await expect(link).toHaveAttribute('href', PAGE)
  await open(page)
  await expect(page.getByRole('heading', { level: 3, name: "Newton's second law" })).toBeVisible()
  await expect(page.getByText('F = 10 N, m = 2.0 kg', { exact: true })).toBeVisible()
})

test('3–4. initial frame and prediction controls', async ({ page }) => {
  await open(page)
  expect(await phase(page)).toBe('idle')
  expect(await tick(page)).toBe(0)
  await expect(page.getByTestId('inspect-frame-id')).toHaveText('newton-second-law-10-2-0')
  await expect(page.getByTestId('readout-t')).toHaveText('0.00 s')
  await expect(page.getByTestId('readout-v')).toHaveText('0.00 m/s')
  expect(await vtPoints(page)).toBe(0)
  expect(await evidence(page)).toEqual([])

  const prediction = page.getByTestId('prediction')
  await expect(prediction).toHaveAttribute('data-prediction-id', 'double-mass')
  for (const label of ['It doubles', 'It halves', 'It stays the same', 'Skip — just experiment']) {
    await expect(prediction.getByRole('button', { name: label })).toBeVisible()
  }
  await expect(page.getByRole('button', { name: 'Run' })).toBeEnabled()
  await expect(page.getByRole('button', { name: 'Pause' })).toBeDisabled()
  await expect(page.getByRole('button', { name: 'Reset' })).toBeDisabled()
  await expect(page.getByLabel('F (N)')).toBeEnabled()
  // The frame's generic challenge modes (which promise hidden values) are not
  // offered over a simulation whose readouts state every value.
  await expect(page.getByRole('group', { name: 'How this figure is being used' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Test me' })).toHaveCount(0)

  await prediction.getByRole('button', { name: 'It halves' }).click()
  await expect(prediction).toContainText('Your prediction: It halves.')
  await expect(prediction.getByText(/Test it fairly: change only m/)).toBeVisible()
  const ev = await evidence(page)
  expect(ev).toHaveLength(1)
  expect(ev[0]).toMatchObject({ kind: 'prediction', predictionId: 'double-mass', choice: 1 })
})

test('5–8, 10, 13. Run, lock, Pause, Step, Reset — and the v–t graph grows', async ({ page }) => {
  await open(page)
  await setSlow(page)

  await page.getByRole('button', { name: 'Run' }).click()
  await expect.poll(() => phase(page)).toBe('running')
  await expect.poll(() => tick(page)).toBeGreaterThan(40)
  // 10. Values are locked while the run is active.
  await expect(page.getByLabel('F (N)')).toBeDisabled()
  await expect(page.getByLabel('m (kg)')).toBeDisabled()
  await expect(page.getByTestId('simulation-status')).toContainText('locked')
  // 13. The v–t trace grows as time passes.
  const pointsEarly = await vtPoints(page)
  await expect.poll(() => vtPoints(page)).toBeGreaterThan(pointsEarly)

  // 6. Pause preserves the state exactly.
  await page.getByRole('button', { name: 'Pause' }).click()
  expect(await phase(page)).toBe('paused')
  const pausedAt = await tick(page)
  await page.waitForTimeout(600)
  expect(await tick(page)).toBe(pausedAt)
  await expect(page.getByLabel('F (N)')).toBeEnabled()
  await expect(page.getByTestId('readout-a_measured')).toHaveText('0.10 m/s²')

  // 7. Step advances exactly 5 ticks (0.1 s).
  await page.getByRole('button', { name: 'Step 0.1 s' }).click()
  expect(await tick(page)).toBe(pausedAt + 5)

  // 8. Reset returns to the start line.
  await page.getByRole('button', { name: 'Reset' }).click()
  expect(await phase(page)).toBe('idle')
  expect(await tick(page)).toBe(0)
  expect(await vtPoints(page)).toBe(0)
})

test('11. a hidden tab pauses the run', async ({ page }) => {
  await open(page)
  await setSlow(page)
  await page.getByRole('button', { name: 'Run' }).click()
  await expect.poll(() => tick(page)).toBeGreaterThan(10)
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect.poll(() => phase(page)).toBe('paused')
  const at = await tick(page)
  await page.waitForTimeout(500)
  expect(await tick(page)).toBe(at)
})

test('a run finishes on its exact terminal tick', async ({ page }) => {
  await open(page)
  await page.getByRole('button', { name: 'Run' }).click()
  await expect.poll(() => phase(page), { timeout: 15_000 }).toBe('finished')
  expect(await tick(page)).toBe(142)
  await expect(page.getByTestId('simulation-status')).toContainText('reached the end of the track')
  await expect(page.getByTestId('readout-a_measured')).toHaveText('5.00 m/s²')
  await expect(page.getByRole('button', { name: 'Run' })).toBeDisabled()
})

test('14–16. evidence: four separate record kinds, in memory only, and no network, storage or tutor calls', async ({ page }) => {
  await open(page)
  const storageBefore = await page.evaluate(async () => ({
    local: Object.keys(localStorage).sort(),
    session: Object.keys(sessionStorage).sort(),
    idb: (await (indexedDB.databases?.() ?? Promise.resolve([]))).map((d) => d.name).sort(),
  }))

  // Every request made from here on, bar dev tooling and the exact app-shell
  // session refresh, would be the simulation's (see simulationNetwork.ts).
  const network = watchNetwork(page, new URL(page.url()).origin)

  // Predict, then a FAIR test: mass 2 kg → 4 kg at the same 10 N.
  await page.getByTestId('prediction').getByRole('button', { name: 'It halves' }).click()
  await page.getByRole('button', { name: 'Run' }).click()
  await expect.poll(() => phase(page), { timeout: 15_000 }).toBe('finished')
  await page.getByLabel('m (kg)').fill('4')
  await page.getByRole('button', { name: 'Run' }).click()
  await expect.poll(() => phase(page), { timeout: 15_000 }).toBe('finished')

  const interpretation = page.getByTestId('interpretation')
  await expect(interpretation).toContainText('inverse proportion')
  await expect(interpretation).toContainText('That matches your prediction.')
  // The authored explanation is VISIBLE, not merely in the DOM (measured: it was
  // first styled with the hover-only slider-hint class and never showed).
  await expect(interpretation.getByText(/inversely proportional to mass/)).toBeVisible()
  await expect(page.getByTestId('simulation-runs').locator('tbody tr')).toHaveCount(2)

  const ev = await evidence(page)
  const kinds = new Set(ev.map((e) => e.kind))
  expect([...kinds].sort()).toEqual(['action', 'interpretation', 'observation', 'prediction'])
  expect(new Set(ev.map((e) => e.id)).size).toBe(ev.length) // every record is its own record
  expect(ev.filter((e) => e.kind === 'action').map((e) => e.action)).toEqual(['run', 'set', 'run'])
  expect(ev.filter((e) => e.kind === 'observation').map((e) => e.runId)).toEqual(['run-1', 'run-2'])
  const interp = ev.find((e) => e.kind === 'interpretation')!
  expect(interp).toMatchObject({ predictionId: 'double-mass', observedRelation: 'inverse', matchedPrediction: true, runIds: ['run-1', 'run-2'] })
  for (const e of ev) {
    expect(Object.keys(e)).not.toContain('correct')
    expect(Object.keys(e)).not.toContain('score')
  }

  // 16. No network activity at all from the simulation — no API, no database, no tutor.
  expect(network.unexpected()).toEqual([])
  // 14. Nothing written to browser storage.
  const storageAfter = await page.evaluate(async () => ({
    local: Object.keys(localStorage).sort(),
    session: Object.keys(sessionStorage).sort(),
    idb: (await (indexedDB.databases?.() ?? Promise.resolve([]))).map((d) => d.name).sort(),
  }))
  expect(storageAfter).toEqual(storageBefore)

  // In memory only: a reload starts from nothing.
  await page.reload({ waitUntil: 'networkidle' })
  await expect(sim(page)).toBeVisible({ timeout: 60_000 })
  expect(await evidence(page)).toEqual([])
})

test.describe('12. reduced motion', () => {
  test('no Run, no autoplay — step and drag through time instead', async ({ page }) => {
    // Explicit emulation: the `reducedMotion` fixture option was measured NOT to
    // reach the page with a pre-installed browser build (matchMedia stayed false).
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await open(page)
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true)
    await expect(page.getByRole('button', { name: 'Run' })).toHaveCount(0)
    await expect(sim(page)).toContainText('Motion is off')
    const scrubber = page.getByRole('slider', { name: 'Time', exact: true })
    await expect(scrubber).toBeVisible()

    // 9. Seek via the scrubber.
    await scrubber.fill('70')
    expect(await tick(page)).toBe(70)
    expect(await phase(page)).toBe('paused')
    await expect(page.getByTestId('readout-t')).toHaveText('1.40 s')
    expect(await vtPoints(page)).toBeGreaterThan(0)

    await page.getByRole('button', { name: 'Step 0.1 s' }).click()
    expect(await tick(page)).toBe(75)
    await page.waitForTimeout(500)
    expect(await tick(page)).toBe(75) // nothing drives it

    await scrubber.fill('142')
    expect(await phase(page)).toBe('finished')
    const actions = (await evidence(page)).filter((e) => e.kind === 'action').map((e) => e.action)
    expect(actions).toEqual(['seek', 'step', 'seek'])
  })
})

/**
 * Screenshot audit capture script.
 *
 * Run with: npx tsx scripts/screenshot-audit/capture.ts
 * Requires: dev server already running on http://localhost:3000
 *           (npm run dev), and demo data seeded via
 *           scripts/seed-screenshot-demo.ts.
 *
 * Logs in via the real /auth/login UI (no manual cookie minting) for both
 * the student and admin demo accounts, then walks every meaningful route,
 * saving full-page desktop screenshots (1440x900) into screenshots/<category>/
 * and a handful of mobile-viewport (390x844) recreations of major screens
 * into screenshots/mobile/.
 */
import { chromium, type Browser, type BrowserContext, type Page } from 'playwright'
import * as path from 'path'
import * as fs from 'fs'

const BASE = 'http://localhost:3000'
const ROOT = path.resolve(__dirname, '../../screenshots')
// Playwright's own bundled chromium (PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers in this
// container) — /usr/bin/chromium-browser is an Ubuntu snap stub that doesn't run.
const EXEC_PATH = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

const STUDENT = { email: 'shot.student@mytutor-demo.local', password: 'DemoPass123!' }
const ADMIN = { email: 'shot.admin@mytutor-demo.local', password: 'DemoPass123!' }
const SCHOOL = { email: 'shot.school@mytutor-demo.local', password: 'DemoPass123!' }

const STUDENT_CERT_CODE = process.env.DEMO_CERT_CODE || ''
const SUBJECT_CERT_CODE = process.env.DEMO_SUBJECT_CERT_CODE || ''

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true })
}

async function shot(page: Page, category: string, slug: string, opts: { fullPage?: boolean } = {}) {
  const dir = path.join(ROOT, category)
  ensureDir(dir)
  const file = path.join(dir, `${slug}.png`)
  await page.screenshot({ path: file, fullPage: opts.fullPage !== false })
  console.log(`  [${category}] ${slug}.png`)
}

async function gotoSafe(page: Page, url: string, waitMs = 1200) {
  try {
    await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 20000 })
  } catch {
    // networkidle can time out on pages with polling/streaming; fall back to load
    try {
      await page.goto(BASE + url, { waitUntil: 'load', timeout: 20000 })
    } catch (e) {
      console.warn(`  ! navigation issue for ${url}:`, (e as Error).message)
    }
  }
  await page.waitForTimeout(waitMs)
}

async function loginAs(context: BrowserContext, email: string, password: string) {
  const page = await context.newPage()
  await page.goto(BASE + '/auth/login', { waitUntil: 'networkidle' })
  await page.fill('input[type="email"]', email)
  await page.fill('input[type="password"]', password)
  await page.click('button[type="submit"]')
  // Login redirects to /dashboard (or onboarding) on success.
  await page.waitForURL((url) => !url.pathname.startsWith('/auth/login'), { timeout: 15000 }).catch(() => {})
  await page.waitForTimeout(1000)
  return page
}

async function captureAuthScreens(browser: Browser) {
  console.log('\n== auth (logged out) ==')
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()

  await gotoSafe(page, '/auth/login')
  await shot(page, 'auth', 'auth-login')

  await gotoSafe(page, '/auth/signup')
  await shot(page, 'auth', 'auth-signup')

  await gotoSafe(page, '/auth/forgot-password')
  await shot(page, 'auth', 'auth-forgot-password')

  // reset-password normally requires a token query param; visit bare to see the error/empty state
  await gotoSafe(page, '/auth/reset-password')
  await shot(page, 'auth', 'auth-reset-password')

  // ─── Error states (logged out) ───────────────────────────────────────────
  console.log('\n== error states (logged out) ==')
  await gotoSafe(page, '/dashboard')
  await shot(page, 'auth', 'error-unauth-redirect')

  await gotoSafe(page, '/admin')
  await shot(page, 'auth', 'error-unauth-admin-redirect')

  await context.close()
}

async function captureStudentFlow(browser: Browser) {
  console.log('\n== student login ==')
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await loginAs(context, STUDENT.email, STUDENT.password)

  console.log('\n== student/* ==')
  await gotoSafe(page, '/dashboard')
  await shot(page, 'student', 'student-dashboard')

  await gotoSafe(page, '/learn')
  await shot(page, 'student', 'student-learn')

  await gotoSafe(page, '/progress')
  await shot(page, 'student', 'student-progress')

  await gotoSafe(page, '/quiz')
  await shot(page, 'student', 'student-quiz')

  await gotoSafe(page, '/flashcards')
  await shot(page, 'student', 'student-flashcards')

  await gotoSafe(page, '/coach')
  await shot(page, 'student', 'student-coach')

  await gotoSafe(page, '/certificates')
  await shot(page, 'student', 'student-certificates')

  if (STUDENT_CERT_CODE) {
    await gotoSafe(page, `/certificates/${STUDENT_CERT_CODE}`)
    await shot(page, 'student', 'student-certificate-detail')
  }

  await gotoSafe(page, '/leaderboard')
  await shot(page, 'student', 'student-leaderboard')

  await gotoSafe(page, '/settings')
  await shot(page, 'student', 'student-settings')

  await gotoSafe(page, '/modes')
  await shot(page, 'student', 'student-modes')

  console.log('\n== education/* (as student) ==')
  await gotoSafe(page, '/library')
  await shot(page, 'education', 'education-library')

  await gotoSafe(page, '/library/python')
  await shot(page, 'education', 'education-library-python')

  // error state: non-existent library slug
  await gotoSafe(page, '/library/does-not-exist')
  await shot(page, 'education', 'error-library-invalid-slug')

  await gotoSafe(page, '/dev/visual-demo')
  await shot(page, 'education', 'education-visual-demo')

  console.log('\n== error states (student, non-admin) ==')
  await gotoSafe(page, '/admin')
  await shot(page, 'student', 'error-nonadmin-admin-redirect')

  // error state: invalid certificate code
  await gotoSafe(page, '/certificates/INVALID-CODE-XYZ')
  await shot(page, 'student', 'error-certificate-invalid-code')

  await context.close()
}

async function captureSchoolFlow(browser: Browser) {
  console.log('\n== school login (CBSE grade 8 student) ==')
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await loginAs(context, SCHOOL.email, SCHOOL.password)

  console.log('\n== school/* ==')
  await gotoSafe(page, '/school/mathematics')
  await shot(page, 'school', 'school-subject-mathematics')

  await gotoSafe(page, '/school/mathematics/chapters')
  await shot(page, 'school', 'school-subject-chapters')

  // Need a real chapterId — fetch from the page DOM via link href, fallback to chapter 1 slug guess
  let chapterId: string | null = null
  try {
    chapterId = await page.evaluate(() => {
      const link = Array.from(document.querySelectorAll('a')).find((a) =>
        /\/school\/mathematics\/chapter\//.test(a.getAttribute('href') || '')
      )
      if (!link) return null
      const href = link.getAttribute('href') || ''
      const match = href.match(/\/chapter\/([^/]+)/)
      return match ? decodeURIComponent(match[1]) : null
    })
  } catch {
    chapterId = null
  }

  if (chapterId) {
    await gotoSafe(page, `/school/mathematics/chapter/${encodeURIComponent(chapterId)}`)
    await shot(page, 'school', 'school-subject-chapter-detail')

    await gotoSafe(page, `/school/mathematics/chapter/${encodeURIComponent(chapterId)}/practice`)
    await shot(page, 'school', 'school-subject-chapter-practice')

    await gotoSafe(page, `/school/mathematics/chapter/${encodeURIComponent(chapterId)}/assessment`)
    await shot(page, 'school', 'school-subject-chapter-assessment')
  } else {
    console.warn('  ! could not resolve a chapterId from /school/mathematics/chapters DOM')
  }

  await gotoSafe(page, '/school/mathematics/mock')
  await shot(page, 'school', 'school-subject-mock')

  await gotoSafe(page, '/school/focus')
  await shot(page, 'school', 'school-focus')

  await context.close()
  return { chapterId }
}

async function captureAdminFlow(browser: Browser) {
  console.log('\n== admin login ==')
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await loginAs(context, ADMIN.email, ADMIN.password)

  console.log('\n== admin/* ==')
  const adminPages: [string, string][] = [
    ['/admin', 'admin-overview'],
    ['/admin/users', 'admin-users'],
    ['/admin/subjects', 'admin-subjects'],
    ['/admin/curriculum', 'admin-curriculum'],
    ['/admin/knowledge-graphs', 'admin-knowledge-graphs'],
    ['/admin/analytics', 'admin-analytics'],
    ['/admin/ai-ops', 'admin-ai-ops'],
    ['/admin/ops', 'admin-ops'],
    ['/admin/settings', 'admin-settings'],
  ]
  for (const [url, slug] of adminPages) {
    await gotoSafe(page, url)
    await shot(page, 'admin', slug)
  }

  // /admin/users/[id] — grab a real user id from the users table DOM
  let userId: string | null = null
  try {
    await gotoSafe(page, '/admin/users')
    userId = await page.evaluate(() => {
      const link = Array.from(document.querySelectorAll('a')).find((a) =>
        /\/admin\/users\/[^/]+$/.test(a.getAttribute('href') || '') && !a.getAttribute('href')?.endsWith('/users')
      )
      if (!link) return null
      const href = link.getAttribute('href') || ''
      const match = href.match(/\/admin\/users\/([^/]+)$/)
      return match ? match[1] : null
    })
  } catch {
    userId = null
  }

  if (userId) {
    await gotoSafe(page, `/admin/users/${userId}`)
    await shot(page, 'admin', 'admin-users-detail')
  } else {
    console.warn('  ! could not resolve a user id from /admin/users DOM')
  }

  await context.close()
}

async function captureOnboarding(browser: Browser) {
  console.log('\n== onboarding (fresh user, no profile) ==')
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()

  // Sign up a brand-new user via the real UI so onboarding renders for a
  // genuinely fresh (onboardingCompleted=false, no profile) account.
  const freshEmail = `shot.fresh.${Date.now()}@mytutor-demo.local`
  await gotoSafe(page, '/auth/signup')
  try {
    const nameInput = await page.$('input[type="text"]')
    if (nameInput) await nameInput.fill('Fresh Demo User')
    await page.fill('input[type="email"]', freshEmail)
    const pwdInputs = await page.$$('input[type="password"]')
    for (const input of pwdInputs) await input.fill('DemoPass123!')
    await page.click('button[type="submit"]')
    await page.waitForURL((url) => !url.pathname.startsWith('/auth/signup'), { timeout: 15000 }).catch(() => {})
    await page.waitForTimeout(1500)
  } catch (e) {
    console.warn('  ! signup flow issue:', (e as Error).message)
  }

  await gotoSafe(page, '/onboarding')
  await shot(page, 'onboarding', 'onboarding-start')

  await context.close()
}

async function captureMobile(browser: Browser) {
  console.log('\n== mobile viewport recreations ==')
  const viewport = { width: 390, height: 844 }

  // Each role gets its own context so cookie jars never collide (reusing one
  // context across logins means the 2nd loginAs() hits /auth/login while
  // still authenticated as the previous user, and middleware bounces it
  // straight to /dashboard before the form ever renders).
  const studentCtx = await browser.newContext({ viewport })
  const studentPage = await loginAs(studentCtx, STUDENT.email, STUDENT.password)
  await gotoSafe(studentPage, '/dashboard')
  await shot(studentPage, 'mobile', 'mobile-dashboard', { fullPage: false })
  await gotoSafe(studentPage, '/learn')
  await shot(studentPage, 'mobile', 'mobile-learn', { fullPage: false })
  await gotoSafe(studentPage, '/quiz')
  await shot(studentPage, 'mobile', 'mobile-quiz', { fullPage: false })
  await studentCtx.close()

  const schoolCtx = await browser.newContext({ viewport })
  const schoolPage = await loginAs(schoolCtx, SCHOOL.email, SCHOOL.password)
  await gotoSafe(schoolPage, '/school/mathematics')
  await shot(schoolPage, 'mobile', 'mobile-school-subject', { fullPage: false })
  await schoolCtx.close()

  const adminCtx = await browser.newContext({ viewport })
  const adminPage = await loginAs(adminCtx, ADMIN.email, ADMIN.password)
  await gotoSafe(adminPage, '/admin')
  await shot(adminPage, 'mobile', 'mobile-admin-home', { fullPage: false })
  await adminCtx.close()
}

// Optional CLI filter, e.g. `npx tsx capture.ts mobile,admin` to re-run just
// those sections (useful when iterating without re-running the whole suite).
const SECTIONS: Record<string, (b: Browser) => Promise<unknown>> = {
  auth: captureAuthScreens,
  student: captureStudentFlow,
  school: captureSchoolFlow,
  admin: captureAdminFlow,
  onboarding: captureOnboarding,
  mobile: captureMobile,
}

async function main() {
  const filter = process.argv[2]?.split(',').map((s) => s.trim()).filter(Boolean)
  const toRun = filter && filter.length ? filter : Object.keys(SECTIONS)

  const browser = await chromium.launch({ executablePath: EXEC_PATH, headless: true })
  try {
    for (const name of toRun) {
      const fn = SECTIONS[name]
      if (!fn) {
        console.warn(`Unknown section "${name}", skipping. Valid: ${Object.keys(SECTIONS).join(', ')}`)
        continue
      }
      await fn(browser)
    }
  } finally {
    await browser.close()
  }
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

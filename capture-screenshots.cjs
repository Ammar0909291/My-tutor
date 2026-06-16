const { chromium } = require('playwright')
const path = require('path')
const fs = require('fs')

const BASE = 'http://localhost:3000'
const OUT = path.join(__dirname, 'screenshots')
const DESKTOP = { width: 1440, height: 900 }
const MOBILE  = { width: 390, height: 844 }
const TABLET  = { width: 768, height: 1024 }

const results = []

async function shot(page, filename, label, route) {
  try {
    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {})
    await page.waitForTimeout(800)
    await page.screenshot({ path: filename, fullPage: true })
    console.log(`  ✅ ${path.basename(filename)}`)
    results.push({ route, filename: path.basename(filename), label, status: 'OK', note: '' })
  } catch (e) {
    console.log(`  ⚠️  ${path.basename(filename)}: ${e.message.slice(0,60)}`)
    results.push({ route, filename: path.basename(filename), label, status: 'FAIL', note: e.message.slice(0,80) })
  }
}

async function loginAs(page, email, password) {
  await page.goto(`${BASE}/auth/login`, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('input[type="email"], input[name="email"]', { timeout: 8000 })
  await page.fill('input[type="email"], input[name="email"]', email)
  await page.fill('input[type="password"], input[name="password"]', password)
  await page.click('button[type="submit"]')
  await page.waitForURL(/\/dashboard|\/onboarding|\/learn/, { timeout: 10000 }).catch(() => {})
  await page.waitForTimeout(1000)
}

async function run() {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage'] })

  // ── AUTH PAGES (no login needed) ─────────────────────────────────────────
  console.log('\n📸 AUTH pages')
  {
    const ctx = await browser.newContext({ viewport: DESKTOP })
    const p = await ctx.newPage()

    await p.goto(`${BASE}/auth/login`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/auth/login.png`, 'Login', '/auth/login')

    await p.goto(`${BASE}/auth/signup`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/auth/register.png`, 'Register', '/auth/signup')

    await p.goto(`${BASE}/auth/forgot-password`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/auth/forgot-password.png`, 'Forgot Password', '/auth/forgot-password')

    await ctx.close()
  }

  // ── STUDENT PAGES ─────────────────────────────────────────────────────────
  console.log('\n📸 STUDENT pages')
  {
    const ctx = await browser.newContext({ viewport: DESKTOP })
    const p = await ctx.newPage()
    await loginAs(p, 'student@mytutor.dev', 'Student123!')

    await p.goto(`${BASE}/dashboard`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/student/dashboard.png`, 'Dashboard', '/dashboard')

    await p.goto(`${BASE}/learn`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/student/learn.png`, 'Learn (subject select)', '/learn')

    await p.goto(`${BASE}/progress`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/student/progress.png`, 'Progress', '/progress')

    await p.goto(`${BASE}/flashcards`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/student/flashcards.png`, 'Flashcards', '/flashcards')

    await p.goto(`${BASE}/quiz`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/student/quiz.png`, 'Quiz', '/quiz')

    await p.goto(`${BASE}/leaderboard`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/student/leaderboard.png`, 'Leaderboard', '/leaderboard')

    await p.goto(`${BASE}/certificates`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/student/certificates.png`, 'Certificates', '/certificates')

    await p.goto(`${BASE}/certificates/MT-DEMO-PY001`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/student/certificate-detail.png`, 'Certificate Detail', '/certificates/MT-DEMO-PY001')

    await p.goto(`${BASE}/coach`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/student/coach.png`, 'Coach', '/coach')

    await p.goto(`${BASE}/settings`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/student/settings.png`, 'Settings', '/settings')

    await p.goto(`${BASE}/library`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/student/library.png`, 'Subject Library', '/library')

    await p.goto(`${BASE}/library/python`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/student/library-subject.png`, 'Library Subject Detail', '/library/python')

    await p.goto(`${BASE}/onboarding`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/student/onboarding.png`, 'Onboarding', '/onboarding')

    await ctx.close()
  }

  // ── ADMIN PAGES ────────────────────────────────────────────────────────────
  console.log('\n📸 ADMIN pages')
  {
    const ctx = await browser.newContext({ viewport: DESKTOP })
    const p = await ctx.newPage()
    await loginAs(p, 'admin@mytutor.dev', 'Admin1234!')

    await p.goto(`${BASE}/admin`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/admin/admin-home.png`, 'Admin Home', '/admin')

    await p.goto(`${BASE}/admin/ops`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/admin/operations-center.png`, 'Operations Center', '/admin/ops')

    await p.goto(`${BASE}/admin/users`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/admin/users.png`, 'User Management', '/admin/users')

    await p.goto(`${BASE}/admin/subjects`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/admin/subjects.png`, 'Subject Management', '/admin/subjects')

    await p.goto(`${BASE}/admin/analytics`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/admin/analytics.png`, 'Admin Analytics', '/admin/analytics')

    await p.goto(`${BASE}/admin/curriculum`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/admin/curriculum.png`, 'Admin Curriculum', '/admin/curriculum')

    await p.goto(`${BASE}/admin/knowledge-graphs`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/admin/knowledge-graphs.png`, 'Knowledge Graphs', '/admin/knowledge-graphs')

    await p.goto(`${BASE}/admin/ai-ops`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/admin/ai-ops.png`, 'AI Ops', '/admin/ai-ops')

    await p.goto(`${BASE}/admin/settings`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/admin/settings.png`, 'Admin Settings', '/admin/settings')

    await ctx.close()
  }

  // ── SCHOOL PAGES ──────────────────────────────────────────────────────────
  console.log('\n📸 SCHOOL pages')
  {
    const ctx = await browser.newContext({ viewport: DESKTOP })
    const p = await ctx.newPage()
    await loginAs(p, 'school@mytutor.dev', 'School123!')

    await p.goto(`${BASE}/dashboard`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/school/school-dashboard.png`, 'School Student Dashboard', '/dashboard')

    await p.goto(`${BASE}/school/mathematics`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/school/subject-home.png`, 'School Subject Home', '/school/mathematics')

    await p.goto(`${BASE}/school/mathematics/chapters`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/school/chapters.png`, 'School Chapters', '/school/mathematics/chapters')

    await p.goto(`${BASE}/school/focus`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/school/focus.png`, 'School Focus Mode', '/school/focus')

    await ctx.close()
  }

  // ── ERROR / EDGE STATES ────────────────────────────────────────────────────
  console.log('\n📸 ERROR states')
  {
    const ctx = await browser.newContext({ viewport: DESKTOP })
    const p = await ctx.newPage()

    await p.goto(`${BASE}/nonexistent-page-404`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/error/not-found.png`, '404 Not Found', '/nonexistent-page-404')

    // Unauthenticated access to protected route
    await p.goto(`${BASE}/dashboard`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/error/unauthorized-redirect.png`, 'Unauthorized Redirect', '/dashboard (unauth)')

    await ctx.close()
  }

  // ── MOBILE RESPONSIVE ─────────────────────────────────────────────────────
  console.log('\n📸 MOBILE views')
  {
    const ctx = await browser.newContext({ viewport: MOBILE, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1' })
    const p = await ctx.newPage()
    await loginAs(p, 'student@mytutor.dev', 'Student123!')

    await p.goto(`${BASE}/dashboard`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/mobile/dashboard-mobile.png`, 'Dashboard (Mobile)', '/dashboard')

    await p.goto(`${BASE}/learn`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/mobile/learn-mobile.png`, 'Learn (Mobile)', '/learn')

    await p.goto(`${BASE}/flashcards`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/mobile/flashcards-mobile.png`, 'Flashcards (Mobile)', '/flashcards')

    await p.goto(`${BASE}/leaderboard`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/mobile/leaderboard-mobile.png`, 'Leaderboard (Mobile)', '/leaderboard')

    // mobile auth
    await ctx.clearCookies()
    await p.goto(`${BASE}/auth/login`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/mobile/login-mobile.png`, 'Login (Mobile)', '/auth/login')

    await ctx.close()
  }

  // ── TABLET RESPONSIVE ─────────────────────────────────────────────────────
  console.log('\n📸 TABLET views')
  {
    const ctx = await browser.newContext({ viewport: TABLET })
    const p = await ctx.newPage()
    await loginAs(p, 'student@mytutor.dev', 'Student123!')

    await p.goto(`${BASE}/dashboard`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/tablet/dashboard-tablet.png`, 'Dashboard (Tablet)', '/dashboard')

    await p.goto(`${BASE}/learn`, { waitUntil: 'domcontentloaded' })
    await shot(p, `${OUT}/tablet/learn-tablet.png`, 'Learn (Tablet)', '/learn')

    await ctx.close()
  }

  await browser.close()

  // Output results JSON for audit generation
  fs.writeFileSync('/tmp/screenshot-results.json', JSON.stringify(results, null, 2))
  console.log(`\n✅ Done: ${results.filter(r=>r.status==='OK').length} OK, ${results.filter(r=>r.status==='FAIL').length} failed`)
}

run().catch(e => { console.error(e); process.exit(1) })
